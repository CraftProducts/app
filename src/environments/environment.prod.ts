import { version } from '../../package.json';

export const environment = {
  githubApp: {
    url: 'https://craftproduct-gh-app.herokuapp.com',
    clientId: '39fd415410f7d92a1b33'
  },
  production: true,
  appTitle: 'CraftProduct',
  VERSION: version,
  google: {
  },
  defaultRepo:{
    owner: 'CraftProducts',
    repo: 'templates'
  },
  backendUrls: [
    { key: 'templates', value: 'https://raw.githubusercontent.com/CraftProducts/templates/master/templates' },
    { key: 'documentation', value: 'https://github.com/CraftProducts/templates#create-your-own-template' }
  ]
};
