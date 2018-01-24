import * as electron from 'electron'
import * as path from 'path'
import menuAddon from 'spectron-menu-addon'

export default function createApplication() {
  const app = menuAddon.createApplication({
    args: [path.join(__dirname, '..', '..')],
    path: electron.toString()
  })
  return app
}
