import { BrowserWindow, MenuItem, MenuItemConstructorOptions, Menu, ipcMain, Event } from 'electron'


/**
 * Find a menu item in an array of menu items
 * @param menuItems the items to search in.
 * @param labels the label to search for.
 */
// tslint:disable-next-line:array-type
function findItem(menuItems: Array<MenuItem>, labels: string[]) {
	const target = labels[0]
	const rest = labels.slice(1)
	const foundItem = menuItems.find(item => item.label === target)
	if (rest.length === 0) {
		return foundItem
	}

	return findItem(foundItem.submenu.items, rest)
}

/**
 * Register a GET_MENU_ITEM handler
 */
ipcMain.on('SPECTRON_MENU_ADDON/GET_MENU_ITEM', (e, labels) => {
	const menuItem: MenuItem = findItem(Menu.getApplicationMenu().items, labels)
	if (menuItem) {
		//
		// New versions of electron prohibit sending objects with code (and other things).
		// Thus, sending back a menuItem itself is impossible.  Send back a generic object.
		// instead.
		//
		let subItems = []
        if(menuItem.type == 'submenu') {
            menuItem.submenu.items.forEach(element => {
                let menuItemData = {
					path: labels.concat(element.label),
                    label: element.label,
                    checked: element.checked,
                    enabled: element.enabled,
                    visible: element.visible,
                    type: element.type
                }
                subItems.push(menuItemData)
            })
		}
		
		e.returnValue =  { 
			path: labels,
            label: menuItem.label,
            checked: menuItem.checked,
            enabled: menuItem.enabled,
            visible: menuItem.visible,
            type: menuItem.type,
            submenu:  subItems.length,
            subItems: subItems
		}
	} else {
		e.returnValue = ({
			label: ''
		})
	}
})

/**
 * Register a CLICK_MENU_ITEM handler
 */
ipcMain.on('SPECTRON_MENU_ADDON/CLICK_MENU_ITEM', (e, labels) => {
	const item: MenuItem = findItem(Menu.getApplicationMenu().items, labels)
	item.click(item,BrowserWindow.getFocusedWindow(), {})
	e.returnValue = {};
})
