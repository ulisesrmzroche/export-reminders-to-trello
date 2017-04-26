const path = require('path');

const ENV = {
  environment: process.env.NODE_ENV || 'development',
  ROOT_PATH: process.env.ROOT_PATH || path.join(__dirname, '..'),
  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created
  },
  INTEGRATIONS: {},
};

ENV.INTEGRATIONS.trello = {
  devKey: process.env.TRELLO_DEV_KEY,
  devToken: process.env.TRELLO_DEV_TOKEN,
  targetList: process.env.TRELLO_BACKLOG_LIST_ID,
};


const validate = () => {
  // NOTE: Validator should be somewhere else
  Object.keys(ENV.INTEGRATIONS.trello).forEach((key) => {
    const _key = ENV.INTEGRATIONS.trello[key];
    if (!_key) throw new Error(`Missing Key for Trello: ${key}`);
  });
};

validate();

module.exports = ENV;
