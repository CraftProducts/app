import { Gitspace } from './gitspace.state';
import { ActionTypes } from './gitspace.actions';

export function gitspaceReducer(state: Gitspace, action: any): Gitspace {

    switch (action.type) {

        case ActionTypes.SetGitspaceConfig: {
            return { ...state, config: action.payload, files: null };
        }

        case ActionTypes.LoadGitspaceAllArtifactsSuccess: {
            return { ...state, files: action.payload };
        }

        case ActionTypes.LoadGitspaceArtifactSuccess: {
            console.log("LoadGitspaceArtifactSuccess", action.payload);
            return { ...state, loadedFile: action.payload };
        }
        case ActionTypes.ResetGitspaceArtifact: {
            return { ...state, loadedFile: null };
        }

        default: return state;
    }
}