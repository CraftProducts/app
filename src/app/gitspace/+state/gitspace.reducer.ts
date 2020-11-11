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
            const loadedFile = action.payload || {};
            loadedFile.content = loadedFile.content ? JSON.parse(loadedFile.content) : null;
            return {
                ...state, loadedFile
                //,isNew: false
            };
        }
        case ActionTypes.ResetGitspaceArtifact: {
            return { ...state, loadedFile: null };
        }
        // case ActionTypes.CreateNewArtifact: {
        //     return { ...state, loadedFile: null, isNew: true };
        // }

        default: return state;
    }
}