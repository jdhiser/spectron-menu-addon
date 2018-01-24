# SpectronMenuAddon

Provide functionality to click menu items and get their status within spectron tests.

## Installation

```
npm install --save-dev spectron-menu-addon
```

## Usage

```
import * as electron from 'electron'
import * as path from 'path'
import menuAddon from 'spectron-menu-addon'

const app = menuAddon.createApplication({ args: [path.join(__dirname, '..')], path: electron.toString() })

menuAddon.clickMenu('Config'); // 'Config' Menu click
menuAddon.clickMenu('File', 'Save'); // File->Save MenuItem click
await menuAddon.isItemEnabled('File', 'Reset')) // Verify if MenuItem File->Reset is enabled
```

## Example

https://github.com/SALT-AND-PEPPER/spectron-menu-addon/tree/master/example

## API

### menuAddon.createApplication(options: AppConstructorOptions): Application

Creates application to test

### menuAddon.clickMenu(...labels: string[])

Find menu by labels and click.
If the target is nested, it can be specified with variable length arguments.

ex) File -> Save: `menuAddon.clickMenu('File', 'Save')`

### menuAddon.isItemEnabled(...labels: string[]): Promise

Find menu by labels and return true if the item is enabled.
If the target is nested, it can be specified with variable length arguments.

ex) File -> Open: `await menuAddon.isItemEnabled('File', 'Open')`

## License

MIT
