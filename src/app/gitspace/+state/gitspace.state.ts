export interface Gitspace {
    config: any;
    files: any;
    loadedFile: any;
    // isNew: boolean;
  }
  
  export interface GitspaceState {
    readonly gitspace: Gitspace;
  }
  