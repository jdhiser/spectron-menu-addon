import createApplication from './createApplication'
import { waitForChangeCount } from './helper'
import menuAddon from 'spectron-menu-addon'
import assert from 'power-assert'

describe('Increment', function() {
  this.timeout(10000)
  let app
  beforeEach(() => {
    app = createApplication()
    return app.start()
  })
  afterEach(() => {
    return app.stop()
  })

  it('increment count', () => {
    return app.client
      .waitForExist('#count')
      .then(() => {
        menuAddon.clickMenu('Count', 'Increment')
        return waitForChangeCount(app, '1')
      })
      .then(() => assert.ok(true))
  })
})
