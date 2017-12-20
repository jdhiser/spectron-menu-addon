import { Application } from 'spectron'
import * as electron from 'electron-prebuilt'
import * as path from 'path'
import menuAddon from 'spectron-menu-addon'

export default function createApplication() {
  const app = menuAddon.createApplication({ path: electron, args: [path.join(__dirname, '..')] })
  return app
}
