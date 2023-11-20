import { createContext, ReactNode, useCallback, useMemo, useReducer } from 'react';

import { getProjectById, updateProject } from '../apis';
import { SAVE_PROJECT_CHANGES, SET_PROJECT } from '../common/project-context-actions';
import { IKanbanProject } from '../types';
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

  isProjectChanged: false,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setProject(project: IKanbanProject): void {
    throw new Error('ProjectContext not yet initialized.');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveProjectChanges(): void {
    throw new Error('ProjectContext not yet initialized.');
  }
};

export const ProjectContext = createContext<ProjectState>(initialState);

type Action =
  | {
      type: typeof SET_PROJECT;
      payload: IKanbanProject;
    }
  | {
      type: typeof SAVE_PROJECT_CHANGES;
      payload: IKanbanProject;
    };

const reducer = (state: ProjectState, action: Action): ProjectState => {
  switch (action.type) {
    case SET_PROJECT: {
      return {
        ...state,
        isProjectChanged: true,
        project: action.payload
      };
    }

    case SAVE_PROJECT_CHANGES: {
      return {
        ...state,
        isProjectChanged: false,
        project: action.payload
      };
    }

    default:
      return state;
  }
};

export const ProjectContextProvider = (props: {
  children: ReactNode;
  initialProject: IKanbanProject;
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, project: props.initialProject });

  const setProject = useCallback((project: IKanbanProject) => {
    dispatch({
      type: SET_PROJECT,
      payload: project
    });
  }, []);

  const saveProjectChanges = useCallback((project: IKanbanProject) => {
    updateProject(project)
      .then((projectId) => {
        getProjectById(projectId).then((updatedProject) => {
          dispatch({
            type: SAVE_PROJECT_CHANGES,
            payload: updatedProject
          });
        });
      })
      .catch(() => {
        dispatch({
          type: SAVE_PROJECT_CHANGES,
          payload: project
        });
      });
  }, []);

  const value: ProjectState = useMemo(
    () => ({
      ...state,
      setProject,
      saveProjectChanges
    }),
    [state, setProject, saveProjectChanges]
  );

  return <ProjectContext.Provider value={value}>{props.children}</ProjectContext.Provider>;
};
