import { App } from './app.state';

export const appInitialState: App = {
    returnUrl: '',
    templateToLoad: null,
    loadedTemplate: null,

    isModelDirty: false,
    userModelCommand: null
};
