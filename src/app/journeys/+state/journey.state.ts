export interface Journey {
  templates: any;
  currentTemplate: any;

  model: any;
  isModelDirty: boolean;
  
  selectedSection: any;
}

export interface JourneyState {
  readonly journey: Journey;
  readonly app: any;
}
