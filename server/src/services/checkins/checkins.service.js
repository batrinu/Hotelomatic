// Initializes the `checkins` service on path `/checkins`
const createService = require('feathers-nedb');
const createModel = require('../../models/checkins.model');
const hooks = require('./checkins.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'checkins',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/checkins', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('checkins');

  service.hooks(hooks);
};
