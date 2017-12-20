//https://medium.com/@vladimirtolstikov/how-to-merge-d-ts-typings-with-dts-bundle-and-webpack-e8903d699576
function DtsBundlePlugin(libraryName) {
  this.libraryName = libraryName
}
DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin(
    'done',
    function(params) {
      var dts = require('dts-bundle')

      dts.bundle({
        name: this.libraryName,
        main: 'dist/index.d.ts',
        out: 'index.d.ts',
        removeSource: true,
        outputAsModuleFolder: true // to use npm in-package typings
      })
    }.bind(this)
  )
}

module.exports = DtsBundlePlugin
