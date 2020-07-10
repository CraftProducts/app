export interface App {
  returnUrl: string;
  templateToLoad: any;
  loadedTemplate: any;

  loadedFile: any;
  
  isModelDirty: boolean;
  userModelCommand: any;
}

export interface AppState {
  readonly app: App;
}
