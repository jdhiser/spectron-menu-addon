import menuAddon from 'spectron-menu-addon'
import ExamplePage from './pageobject/example.page'
import { expect } from 'chai'
import { MenuItem } from 'electron'

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
    const menuItem = await page.getMenuItem('Count', 'Increment')
    expect(menuItem.enabled).to.equal(true)
  })

  it('should verify File->Reset as disabled', async () => {
    const menuItem = await page.getMenuItem('Count', 'Reset')
    expect(menuItem.enabled).to.equal(false)
  })
})
