import menuAddon from 'spectron-menu-addon'
import ExamplePage from './pageobject/example.page'
import { expect } from 'chai'

describe('Decrement', () => {
  let page: ExamplePage

  before(async () => {
    page = new ExamplePage()
    await page.start()
  })

  after(async () => {
    await page.close()
  })

  it('should decrement count', async () => {
    page.clickMenu('Count', 'Decrement')
    expect(await page.getText()).to.equal('-1')
  })
})
