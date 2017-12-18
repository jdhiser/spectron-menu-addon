import * as electron from 'electron-prebuilt'
import * as path from 'path'
import menuAddon from '../src/index'

const app = menuAddon.createApplication({ path: electron, args: [path.join(__dirname, '.')] })

const assert = require('power-assert')
const fs = require('fs')

describe('click File->Save Menu', function() {
  this.timeout(10000)

  beforeEach(() => {
    return app.start()
  })
  afterEach(() => {
    fs.unlink('sandbox/test.txt')
    return app.stop()
  })

  it('creates test file', () => {
    return app.client
      .getWindowCount()
      .then(count => assert.equal(count, 1))
      .then(() => {
        menuAddon.clickMenu('File', 'Save')
        return new Promise((resolve, reject) => {
          const timer = setInterval(() => {
            if (fs.existsSync('./sandbox/test.txt')) {
              const text = fs.readFileSync('./sandbox/test.txt', 'utf8')
              resolve(text)
              clearInterval(timer)
            }
          }, 1000)
        })
      })
      .then(text => {
        assert.equal(text, 'test')
      })
  })
})
