export interface App {
  returnUrl: string;
  templateToLoad: any;
  loadedTemplate: any;

  isModelDirty: boolean;
  userModelCommand: any;
}

export interface AppState {
  readonly app: App;
}
