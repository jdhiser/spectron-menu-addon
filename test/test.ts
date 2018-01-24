import * as electron from 'electron-prebuilt'
import * as path from 'path'
import menuAddon from '../src/index'
import { expect } from 'chai'
import * as fs from 'fs'

const app = menuAddon.createApplication({ path: electron, args: [path.join(__dirname, '.')] })

describe('click File->Save Menu', function() {
  const folderPath = path.join(__dirname, 'sandbox')
  const filePath = path.join(folderPath, 'test.txt')

  this.timeout(10000)

  beforeEach(async () => {
    await app.start()
  })

  afterEach(async () => {
    fs.unlinkSync(filePath)
    fs.rmdirSync(folderPath)
    await app.stop()
  })

  it('creates test file', async () => {
    expect(await app.client.getWindowCount()).to.equal(1)
    menuAddon.clickMenu('File', 'Save')
    expect(await readFile(filePath)).to.equal('test')
  })
})

const readFile = async (filePath: string) => {
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (fs.existsSync(filePath)) {
        const text = fs.readFileSync(filePath, 'utf8')
        resolve(text)
        clearInterval(timer)
      }
    }, 1000)
  })
}
