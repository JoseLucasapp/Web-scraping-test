import puppeteer from "puppeteer"

export const getNotebooksData = async (param) => {
    const webSiteUrl = 'https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops'

    const browser = await puppeteer.launch({
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })

    const page = await browser.newPage()

    await page.goto(webSiteUrl, { waitUntil: 'networkidle2' })

    const data = await page.$$eval('.test-site > .row > .col-md-9 > .row > .col-sm-4',
        (divs) => divs.map((div) => {
            const description = div.querySelector('.description').innerHTML
            const title = div.querySelector('.title').title
            const price = parseFloat((div.querySelector('h4.pull-right').innerHTML).replace('$', ''))
            const reviews = parseInt((div.querySelector('p.pull-right').innerHTML).replace('reviews', ''))
            const ratings = div.querySelector('div.ratings :nth-child(2)').childElementCount

            return { title, description, price, reviews, ratings }
        }))

    const result = checkParams(data, param.toLowerCase())

    await browser.close();

    return result
}

const checkParams = (data, param = 'lenovo') => {

    const checkedData = []

    for (let i = 0; i < data.length; i++) {
        const check = {
            descriptionPassed: false,
            titlePassed: false
        }


        const title = (data[i].title).split(' ')
        const description = ((data[i].description).split(',')[0]).split(' ')

        for (let t = 0; t < title.length; t++) {
            if (title[t].toLowerCase() === param) {
                check.titlePassed = true
            }
        }

        for (let d = 0; d < description.length; d++) {
            if (description[d].toLowerCase() === param) {
                check.descriptionPassed = true
            }
        }

        if (check.descriptionPassed && check.titlePassed) {
            checkedData.push(data[i])
        }
    }

    return checkedData
}

/*
container test-site
div  col-md-9
row

col-sm-4 col-lg-4 col-md-4
thumbnail
caption
    h4 pull-right price = preço
    h4 a classe = title
    p description com tudo
ratings
    pull-right
    tem um p com um data-rating que é igual a média
*/