"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function findItem(menuItems, labels) {
    var target = labels[0];
    var rest = labels.slice(1);
    var foundItem = menuItems.find(function (item) { return item.label === target; });
    if (rest.length === 0) {
        return foundItem;
    }
    return findItem(foundItem.submenu.items, rest);
}
electron_1.ipcMain.on('SPECTRON_MENU_ADDON/GET_MENU_ITEM', function (e, labels) {
    var menuItem = findItem(electron_1.Menu.getApplicationMenu().items, labels);
    if (menuItem) {
        var subItems_1 = [];
        if (menuItem.type == 'submenu') {
            menuItem.submenu.items.forEach(function (element) {
                var menuItemData = {
                    path: labels.concat(element.label),
                    label: element.label,
                    checked: element.checked,
                    enabled: element.enabled,
                    visible: element.visible,
                    type: element.type
                };
                subItems_1.push(menuItemData);
            });
        }
        e.returnValue = {
            path: labels,
            label: menuItem.label,
            checked: menuItem.checked,
            enabled: menuItem.enabled,
            visible: menuItem.visible,
            type: menuItem.type,
            submenu: subItems_1.length,
            subItems: subItems_1
        };
    }
    else {
        e.returnValue = ({
            label: ''
        });
    }
});
electron_1.ipcMain.on('SPECTRON_MENU_ADDON/CLICK_MENU_ITEM', function (e, labels) {
    var item = findItem(electron_1.Menu.getApplicationMenu().items, labels);
    item.click(item, electron_1.BrowserWindow.getFocusedWindow(), {});
    e.returnValue = {};
});
