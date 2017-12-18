import { Application } from 'spectron'
import electron from 'electron-prebuilt'
import path from 'path'
import menuAddon from 'spectron-menu-addon'

export default function createApplication() {
  console.log(electron)
  const app = menuAddon.createApplication({ path: electron, args: [path.join(__dirname, '..')] })
  return app
}
