# SpectronMenuAddon

Provide manipulation of menus in your spectron's specs.

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
menuAddon.clickMenu('File', 'CloseTab'); // File->CloseTab Menu click
```

## Example

https://github.com/SALT-AND-PEPPER/spectron-menu-addon/tree/master/example

## API

### menuAddon.createApplication(options: AppConstructorOptions): Application

Creates application to test

### menuAddon.clickMenu(...labels: string[])

Find menu by labels and click.
If the target is nested, it can be specified with variable length arguments.

ex) File -> CloseTab: `menuAddon.clickMenu('File', 'CloseTab');`

## License

MIT
