import { Gitspace } from './gitspace.state';
import { ActionTypes } from './gitspace.actions';

export function gitspaceReducer(state: Gitspace, action: any): Gitspace {

    switch (action.type) {

        case ActionTypes.SetGitspaceConfig: {
            return { ...state, config: action.payload, files: null };
        }

        case ActionTypes.LoadGitspaceFilesSuccess: {
            return { ...state, files: action.payload };
        }

        case ActionTypes.InitializeGitspaceSuccess: {
            return { ...state, config: { ...state.config, location: action.payload } };
        }
        default: return state;
    }
}