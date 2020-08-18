# SpectronMenuAddon

Provide functionality to click menu items and get their status within spectron tests.

## Installation

```bash
npm install --save-dev spectron-menu-addon
```

## Usage

```TypeScript
import * as electron from 'electron'
import * as path from 'path'
import menuAddon from 'spectron-menu-addon-v2'

const app = menuAddon.createApplication({ args: [path.join(__dirname, '..')], path: electron.toString() })

menuAddon.clickMenu('Config'); // 'Config' Menu click
menuAddon.clickMenu('File', 'Save'); // File->Save MenuItem click
await menuAddon.isItemEnabled('File', 'Reset')) // Verify if MenuItem File->Reset is enabled
```

## Example

https://github.com/jdhiser/spectron-menu-addon/tree/master/example


## API

### menuAddon.createApplication(options: AppConstructorOptions): Application

Creates application to test

### menuAddon.clickMenu(...labels: string[])

Find menu by labels and click.
If the target is nested, it can be specified with variable length arguments.

ex) File -> Save:

```TypeScript
menuAddon.clickMenu('File', 'Save')
```

### menuAddon.getMenuItem(...labels: string[]): Promise<MenuItem>

Find menu item by labels and return that with following properties:

```TypeScript
{
  checked: boolean
  enabled: boolean
  label: string
  visible: boolean
}
```

> If the target is not found, label is returned as an empty string, all other properties are undefined.

If the target is nested, it can be specified with variable length arguments.

ex) File -> Open:

```TypeScript
await menuAddon.getMenuItem('File', 'Open')
```

## License

MIT
