import { Application } from 'spectron'
import menuAddon from 'spectron-menu-addon'

import createApplication from './create-application'

export default class ExamplePage {
  app: Application

  countElementId = '#count'

  constructor() {
    this.app = createApplication()
  }

  start = async () => {
    await this.app.start()
    await this.app.client.waitUntilWindowLoaded()
    await this.app.client.waitForExist(this.countElementId)
  }

  close = async () => {
    await this.app.stop()
  }

  getWindowCount = async () => {
    return await this.app.client.getWindowCount()
  }

  clickMenu = (...menuItems: string[]) => {
    menuAddon.clickMenu(...menuItems)
  }

  getText = async () => {
    return await this.app.client.getText(this.countElementId)
  }
}
