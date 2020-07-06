export interface App {
  returnUrl: string;
  currentTemplate: any;
  isModelDirty: boolean;
}

export interface AppState {
  readonly app: App;
}
