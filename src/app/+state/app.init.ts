import { App } from './app.state';

export const appInitialState: App = {
    returnUrl: '',
    gitspace: null,

    selectedTemplateGroup: null,
    templateToLoad: null,
    loadedTemplate: null,
    loadedFile: null,

    isModelDirty: false,
    userModelCommand: null
};
