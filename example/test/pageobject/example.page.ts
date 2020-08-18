import { Application } from 'spectron'
import menuAddon from 'spectron-menu-addon-v2'

import createApplication from './create-application'
import { MenuItem } from 'electron'

export default class ExamplePage {
	app: Application

	countElementId = '#count'

	constructor() {
		this.app = createApplication()
	}

	start = async () => {
		await this.app.start();
		await this.app.client.waitUntilWindowLoaded()
		const item = await this.app.client.$(this.countElementId);
		await item.waitForExist();
	}

	close = async () => {
		await this.app.stop()
	}

	getWindowCount = async () => {
		return await this.app.client.getWindowCount()
	}

	clickMenu = async (...menuItems: string[]) => {
		await menuAddon.clickMenu(...menuItems)
	}

	getMenuItem = async (...menuItems: string[]): Promise<MenuItem> => {
		return await menuAddon.getMenuItem(...menuItems)
	}

	getText = async () => {
		const item = await this.app.client.$(this.countElementId)
		return await item.getText();
	}
}
