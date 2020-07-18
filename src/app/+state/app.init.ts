import { App } from './app.state';

export const appInitialState: App = {
    returnUrl: '',

    selectedTemplateGroup: null,
    templateToLoad: null,
    loadedTemplate: null,
    loadedFile: null,
    
    isModelDirty: false,
    userModelCommand: null
};
