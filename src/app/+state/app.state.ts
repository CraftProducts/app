export interface App {
  returnUrl: string;
  gitspace: any;

  selectedTemplateGroup: any;
  templateToLoad: any;
  loadedTemplate: any;
  loadedFile: any;
  
  isModelDirty: boolean;
  userModelCommand: any;
}

export interface AppState {
  readonly app: App;
}
