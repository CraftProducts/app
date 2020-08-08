export interface Modeler {
  dataset: any; //loaded from file
  modelInstance: any;
  selectedSection: any;
}

export interface ModelerState {
  readonly modeler: Modeler;
  readonly app: any;
}
