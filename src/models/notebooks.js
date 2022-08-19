import puppeteer from "puppeteer"
import { checkParams } from "../helpers/utils"

export const getNotebooksData = async () => {
    const webSiteUrl = 'https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops'

    const browser = await puppeteer.launch({
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })

    const page = await browser.newPage()

    await page.goto(webSiteUrl, { waitUntil: 'networkidle2' })

    const data = await evalPage(page)

    const result = checkParams(data)

    await browser.close();

    return { data: result, total: result.length }
}

const evalPage = async (page) => await page.$$eval('.test-site > .row > .col-md-9 > .row > .col-sm-4',
    (divs) => divs.map((div) => {
        const imageUrl = div.querySelector('div.thumbnail img').src
        const description = div.querySelector('.description').innerHTML
        const title = div.querySelector('.title').title
        const price = parseFloat((div.querySelector('h4.pull-right').innerHTML).replace('$', ''))
        const reviews = parseInt((div.querySelector('p.pull-right').innerHTML).replace('reviews', ''))
        const ratings = div.querySelector('div.ratings :nth-child(2)').childElementCount

        return { title, description, price, reviews, ratings, imageUrl }
    })
)