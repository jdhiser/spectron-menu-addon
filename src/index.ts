import * as path from 'path'

import { Application, AppConstructorOptions } from 'spectron'
import { MenuItem } from 'electron'

/**
 * SpectronMenuAdd is a class to help test menu items in spectron.
 */
export class SpectronMenuAddon {
  private app: Application

  /**
   * Create a new application and preload the MenuAddon bits.
   * @param options options to spectron.Application.
   */
  createApplication(options: AppConstructorOptions): Application {
    if (!options.args) {
      options.args = []
    }
    options.args.unshift(path.join(__dirname, 'preload.js'))
    options.args.unshift('--require')
    this.app = new Application(options)

    return this.app
  }

  /**
   * Click a menu item
   * @param labels The item to click, e.g. "File", "Save"
   */
  async clickMenu(...labels: string[]) {
    await this.app.electron.ipcRenderer.sendSync('SPECTRON_MENU_ADDON/CLICK_MENU_ITEM', labels)
  }

  /**
   * Return information about a menu item.
   * @param labels The menu item to query, e.g. "File", "Save"
   */
  async getMenuItem(...labels: string[]): Promise<MenuItem> {
    return await this.app.electron.ipcRenderer.sendSync('SPECTRON_MENU_ADDON/GET_MENU_ITEM', labels)
  }
}


/**
 * A singleton to export for testing.
 */
const spectronMenuAddon = new SpectronMenuAddon()
export default spectronMenuAddon
