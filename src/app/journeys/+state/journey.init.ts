import { Journey } from './journey.state';

export const JourneyInitialState: Journey = {
    templates: null,
    currentTemplate: null,

    model: null,
    isModelDirty: false,
    
    selectedSection: null
};
