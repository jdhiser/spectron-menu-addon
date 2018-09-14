import { MenuItem, MenuItemConstructorOptions, Menu, ipcMain, Event } from 'electron'

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

ipcMain.on('SPECTRON_MENU_ADDON/GET_MENU_ITEM', (e: Event, labels) => {
  const menuItem: MenuItem = findItem(Menu.getApplicationMenu().items, labels)
  if (menuItem) {
    e.returnValue = new MenuItem({
      checked: menuItem.checked,
      enabled: menuItem.enabled,
      label: menuItem.label,
      visible: menuItem.visible
    })
  } else {
    e.returnValue = ({
      label: ''
    })
  }
})

ipcMain.on('SPECTRON_MENU_ADDON/CLICK_MENU_ITEM', (e: Event, labels) => {
  const item: MenuItem = findItem(Menu.getApplicationMenu().items, labels)
  item.click()
})
