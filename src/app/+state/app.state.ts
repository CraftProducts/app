import { Gitspace } from '../gitspace/+state/gitspace.state';

export interface App {
  returnUrl: string;

  selectedTemplateGroup: any;
  templateToLoad: any;
  loadedTemplate: any;
  loadedFile: any;
  
  isModelDirty: boolean;
  userModelCommand: any;
}

export interface AppState {
  readonly app: App;
  readonly gitspace: Gitspace;
}
