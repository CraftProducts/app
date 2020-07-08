export interface App {
  returnUrl: string;
  currentTemplate: any;

  isModelDirty: boolean;
  userModelCommand: string;
}

export interface AppState {
  readonly app: App;
}
