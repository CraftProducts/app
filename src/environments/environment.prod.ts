import { version } from '../../package.json';

export const environment = {
  production: true,
  appTitle: 'ProductPurpose',
  VERSION: version, 
  templateFileLocation: 'https://raw.githubusercontent.com/adhamankar/productpurpose/master/templates',
  google: {
    API_KEY: 'AIzaSyAkoFuREKxogSQ-uOuu0Oy07rRP7CcEj8Y',
    CLIENT_ID: '304736345925-120qpq4eq3k67hptfmp76n12tnv8b7sl.apps.googleusercontent.com'
  },
  backendUrls: [
    { key: 'templates', value: './templates' },
  ]
};
