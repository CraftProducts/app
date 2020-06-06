export interface ValueProp {
  templates: any;
  currentTemplate: any;

  model: any;
  isModelDirty: boolean;
  
  selectedSection: any;
}

export interface ValuePropState {
  readonly valueProp: ValueProp;
  readonly app: any;
}
