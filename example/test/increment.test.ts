import menuAddon from 'spectron-menu-addon-v2'
import ExamplePage from './pageobject/example.page'
import { expect } from 'chai'

describe('Increment', () => {
  let page: ExamplePage

  before(async () => {
    page = new ExamplePage()
    await page.start()
  })

  after(async () => {
    await page.close()
  })

  it('should increment count', async () => {
    page.clickMenu('Count', 'Increment')
    expect(await page.getText()).to.equal('1')
  })
})
