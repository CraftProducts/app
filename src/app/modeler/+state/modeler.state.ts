export interface Modeler {
  modelInstance: any;
  selectedSection: any;
}

export interface ModelerState {
  readonly modeler: Modeler;
  readonly app: any;
}
