const users = require('./users/users.service.js');
const checkins = require('./checkins/checkins.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(checkins);
};
