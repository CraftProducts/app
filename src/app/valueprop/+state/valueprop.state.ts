export interface ValueProp {  
  templates: any;
  currentTemplate: any;

  selectedSection: any;
}

export interface ValuePropState {
  readonly valueProp: ValueProp;
  readonly app: any;
}
