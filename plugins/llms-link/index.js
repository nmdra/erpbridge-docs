const path = require('path');

module.exports = function llmsLinkPlugin() {
  return {
    name: 'llms-link-plugin',
    getClientModules() {
      return [path.resolve(__dirname, './client.js')];
    },
  };
};