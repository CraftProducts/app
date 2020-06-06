import { ValueProp } from './valueprop.state';

export const valuePropInitialState: ValueProp = {
    templates: null,
    currentTemplate: null,

    model: null,
    isModelDirty: false,
    
    selectedSection: null
};
