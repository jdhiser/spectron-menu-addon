import menuAddon from '../src/index'
import { expect } from 'chai'
const fs = require('fs')
const electronPath = require('electron')
const path = require('path')




const app = menuAddon.createApplication({
	path: electronPath.toString(),
	args: [
		path.join(__dirname, '.')
	]
})

describe('Click menu item', function() {
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

	describe('Click File->Save', () => {
		it('should create test file', async () => {
			expect(await app.client.getWindowCount()).to.equal(1)
			await menuAddon.clickMenu('File', 'Save')
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
})

describe('Verify menu item status', function() {
	this.timeout(10000)
	beforeEach(async () => {
		await app.start()
	})

	afterEach(async () => {
		await app.stop()
	})

	it('should verify File->Open as disabled', async () => {
		expect(await app.client.getWindowCount()).to.equal(1)
		const menuItem = await menuAddon.getMenuItem('File', 'Open')
		expect(menuItem.enabled).to.equal(false)
	})

	it('should return empty string if menu item does not exist', async () => {
		expect(await app.client.getWindowCount()).to.equal(1)
		const menuItem = await menuAddon.getMenuItem('File', 'Close')
		expect(menuItem.label).to.equal('')
		expect(menuItem.checked).to.equal(undefined)
		expect(menuItem.enabled).to.equal(undefined)
		expect(menuItem.visible).to.equal(undefined)
	})
})
