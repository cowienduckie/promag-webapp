import { createContext, ReactNode, useCallback, useMemo, useReducer } from 'react';

import { SET_PROJECT } from '../common/project-context-actions';
import { IProject } from '../types';
import { ProjectState } from '../types/ProjectContext';

const initialState: ProjectState = {
  project: {
    id: '',
    name: '',
    notes: '',
    color: '',
    createdOn: new Date(Date.now()),
    tasks: {},
    columns: {},
    columnOrder: []
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setProject(project: IProject): void {
    throw new Error('ProjectContext not yet initialized.');
  }
};

export const ProjectContext = createContext<ProjectState>(initialState);

type Action =
  | {
      type: typeof SET_PROJECT;
      payload: IProject;
    }
  | {
      type: 'NONE';
    };

const reducer = (state: ProjectState, action: Action): ProjectState => {
  switch (action.type) {
    case SET_PROJECT: {
      // TODO: Call API to update project
      return {
        ...state,
        project: action.payload
      };
    }

    default:
      return state;
  }
};

export const ProjectContextProvider = (props: {
  children: ReactNode;
  initialProject: IProject;
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, project: props.initialProject });

  const setProject = useCallback((project: IProject) => {
    dispatch({
      type: SET_PROJECT,
      payload: project
    });
  }, []);

  const value: ProjectState = useMemo(
    () => ({
      ...state,
      setProject
    }),
    [state, setProject]
  );

  return <ProjectContext.Provider value={value}>{props.children}</ProjectContext.Provider>;
};
