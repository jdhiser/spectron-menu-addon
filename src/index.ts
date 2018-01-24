import * as path from 'path'

import { Application, AppConstructorOptions } from 'spectron'

export class SpectronMenuAddon {
  private app: Application

  createApplication(options: AppConstructorOptions): Application {
    if (!options.args) {
      options.args = []
    }
    options.args.unshift(path.join(__dirname, 'preload.js'))
    options.args.unshift('--require')
    this.app = new Application(options)

    return this.app
  }

  clickMenu(...labels: string[]) {
    this.app.electron.ipcRenderer.send('SPECTRON_MENU_ADDON/CLICK_MENU_ITEM', labels)
  }

  async isItemEnabled(...labels: string[]) {
    const enabled = await this.app.electron.ipcRenderer.sendSync(
      'SPECTRON_MENU_ADDON/MENU_ITEM_ENABLED',
      labels
    )

    return enabled
  }
}

const spectronMenuAddon = new SpectronMenuAddon()
export default spectronMenuAddon
