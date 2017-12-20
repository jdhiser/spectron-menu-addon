import { MenuItem, MenuItemConstructorOptions, Menu } from 'electron'

// tslint:disable-next-line:array-type
function findItem(menuItems: Array<MenuItem>, labels: string[]) {
  const target = labels[0]
  const rest = labels.slice(1)
  const foundItem = menuItems.find(item => item.label === target)
  if (rest.length === 0) {
    return foundItem
  }

  return findItem(((foundItem as MenuItemConstructorOptions).submenu as Menu).items, rest)
}

require('electron').ipcMain.on('SPECTRON_MENU_ADDON/SEND', (e, labels) => {
  const item = findItem(require('electron').Menu.getApplicationMenu().items, labels)
  item.click()
})
