import { App } from './app.state';

export const appInitialState: App = {
    returnUrl: '',
    templateToLoad: null,
    loadedTemplate: null,

    loadedFile: null,
    
    isModelDirty: false,
    userModelCommand: null
};
