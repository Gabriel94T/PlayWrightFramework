import { test, expect, request } from '@playwright/test'
import tags from '../test-data/tags.json'

test.beforeEach(async({page}) => {

    await page.route('*/**/api/tags', async route =>  {
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    await page.goto('https://conduit.bondaracademy.com/')
    
    })

    test('has title', async ({page}) => {

        await page.route('*/**/api/articles*', async route => {
            const response = await route.fetch()
            const responseBody = await response.json()
            responseBody.articles[0].title = "Test MOCK title"
            responseBody.articles[0].description = "Description MOCK test"
    
            await route.fulfill({
                body: JSON.stringify(responseBody)
            })
        })

        await page.getByText('Global Feed').click()
        await expect (page.locator('.navbar-brand')).toHaveText('conduit');
        await expect (page.locator('app-article-list h1').first()).toContainText('Test MOCK title')
        await expect (page.locator('app-article-list p').first()).toContainText('Description MOCK test')
    });

    test('delete article', async({page, request}) => {

            const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
            data: {
                article: {title: "tes", description: "test", body: "test", tagList: ["test"]}
            }
        }) 
        expect(articleResponse.status()).toEqual(201)

        await page.getByText('Global Feed').click()
        await page.getByText('tes').click()
        await page.getByRole('button', {name:"Delete Article"}).first().click()
        await page.getByText('Global Feed').click()

        await expect (page.locator('app-article-list h1').first()).not.toContainText('tes')
    })

    test('create article', async({page, request}) => {
        await page.getByText('New Article').click()
        await page.getByRole('textbox', {name:'Article Title'}).fill('tes')
        await page.getByRole('textbox', {name:'What\'s this article about?'}).fill('test')
        await page.getByRole('textbox', {name:'Write your article (in markdown)'}).fill('test')
        await page.getByRole('button',{name:'Publish Article'}).click()
        const  articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
        const  articleResponseBody = await articleResponse.json()
        const slugId = articleResponseBody.article.slug

        await expect (page.locator('.article-page h1')).toContainText('tes')
        await page.getByText('Home').click()
        await page.getByText('Global Feed').click()

        await expect (page.locator('app-article-list h1').first()).toContainText('tes')

           const deleteArticleResponse =  await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`)
            expect(deleteArticleResponse.status()).toEqual(204)
    })
