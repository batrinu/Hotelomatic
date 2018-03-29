const assert = require('assert');
const app = require('../../src/app');

describe('\'checkins\' service', () => {
  it('registered the service', () => {
    const service = app.service('checkins');

    assert.ok(service, 'Registered the service');
  });
});
