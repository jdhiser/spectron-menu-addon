import menuAddon from 'spectron-menu-addon'
import ExamplePage from './pageobject/example.page'
import { expect } from 'chai'

describe('Menu items status', () => {
  let page: ExamplePage

  before(async () => {
    page = new ExamplePage()
    await page.start()
  })

  after(async () => {
    await page.close()
  })

  it('should verify File->Increment as enabled', async () => {
    expect(await page.isItemEnabled('Count', 'Increment')).to.equal(true)
  })

  it('should verify File->Reset as disabled', async () => {
    expect(await page.isItemEnabled('Count', 'Reset')).to.equal(false)
  })
})
