# SpectronMenuAddon

Provide manipulation of menus in your spectron's specs.

## Installation

```
npm install --save-dev spectron-menu-addon
```

## Usage

```
const Application = require('spectron').Application;
const menuAddon = require('spectron-menu-addon');
const app = new Application({ path: electron, args: [ path.join(__dirname, '.') ] });

menuAddon.apply(app); // apply menu
menuAddon.clickMenu('Config'); // 'Config' Menu click
menuAddon.clickMenu('File', 'CloseTab'); // File->CloseTab Menu click
```

## Example

https://github.com/SALT-AND-PEPPER/spectron-menu-addon/tree/master/example

## API

### menuAddon.apply(application: Application)

initialize spectronmenuAddon

### menuAddon.clickMenu(...labels: string)

Find memu by labels and click.
If the target is nested, it can be specified with variable length arguments.

ex) File -> CloseTab: `menuAddon.clickMenu('File', 'CloseTab');`

## TODO

* [ ] provides check box API
* [ ] provides radio button API

## License

MIT
