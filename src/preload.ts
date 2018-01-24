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

ipcMain.on('SPECTRON_MENU_ADDON/CLICK_MENU_ITEM', (e: Event, labels) => {
  const item: MenuItem = findItem(Menu.getApplicationMenu().items, labels)
  item.click()
})
