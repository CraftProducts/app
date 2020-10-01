// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { version } from '../../package.json';

export const environment = {
  appTitle: 'CraftProduct',
  VERSION: version,
  production: false,
  githubApp: {
    url: 'http://localhost:3000',
    clientId: '39fd415410f7d92a1b33'
  },
  google: {
    API_KEY: 'AIzaSyAkoFuREKxogSQ-uOuu0Oy07rRP7CcEj8Y',
    CLIENT_ID: '304736345925-120qpq4eq3k67hptfmp76n12tnv8b7sl.apps.googleusercontent.com'
  },
  defaultRepo: {
    owner: 'CraftProducts',
    repo: 'templates'
  },
  backendUrls: [
    { key: 'templates', value: 'http://localhost:3000/templates' },
    { key: 'documentation', value: 'https://github.com/CraftProducts/templates#create-your-own-template' }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
