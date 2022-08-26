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

    const results = checkParams(data)

    for (let i = 0; i < results.length; i++) {
        const result = results[i]
        await page.goto(result.link)

        const allOptions = await page.evaluate(() => {
            const allPriceButtons = document.querySelectorAll("div.swatches > button");

            const allOptionsDetails = [];
            for (let o = 0; o < allPriceButtons.length; o++) {
                const button = allPriceButtons[o]
                button.click();
                allOptionsDetails.push({
                    price: document.querySelector("div.caption > h4.price").innerHTML,
                    hdd: button.value,
                    disabled: button.classList.contains("disabled"),
                });
            }
            return allOptionsDetails;
        });

        results[i] = { ...result, allOptions };
    }

    await browser.close();

    return { data: results, total: results.length }
}

const evalPage = async (page) => await page.$$eval('.test-site > .row > .col-md-9 > .row > .col-sm-4',
    (divs) => divs.map((div) => {
        const imageUrl = div.querySelector('div.thumbnail img').src
        const link = div.querySelector('div.thumbnail div.caption h4 a').href
        const description = div.querySelector('.description').innerHTML
        const title = div.querySelector('.title').title
        const price = parseFloat((div.querySelector('h4.pull-right').innerHTML).replace('$', ''))
        const reviews = parseInt((div.querySelector('p.pull-right').innerHTML).replace('reviews', ''))
        const ratings = div.querySelector('div.ratings :nth-child(2)').childElementCount

        return { title, link, description, price, reviews, ratings, imageUrl }
    })
)