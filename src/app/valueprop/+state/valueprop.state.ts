export interface ValueProp {
  templateDetails: any;
  templateModel: any;

  modelInstance: any;
  modelDataset: any;

  selectedSection: any;
}

export interface ValuePropState {
  readonly valueProp: ValueProp;
  readonly app: any;
}
