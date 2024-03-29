import { createContext, ReactNode, useCallback, useMemo, useReducer } from 'react';

import { IWorkspace } from '@/features/workspaces/types/IWorkspace';

import { editTask, getProjectById, updateProject } from '../apis';
import { createTask } from '../apis/taskApis';
import {
  ADD_TASK,
  SAVE_PROJECT_CHANGES,
  SET_PROJECT,
  UPDATE_TASK
} from '../common/project-context-actions';
import { IKanbanProject, IKanbanTask } from '../types';
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
    columnOrder: [],
    workspaceId: ''
  },
  workspace: {
    id: '',
    name: '',
    ownerId: '',
    members: [],
    invitations: []
  },
  isProjectChanged: false,
  saveProjectChanges(): void {
    throw new Error('ProjectContext not yet initialized.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setProject(project: IKanbanProject): void {
    throw new Error('ProjectContext not yet initialized.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addTask(task: IKanbanTask, projectId: string): void {
    throw new Error('ProjectContext not yet initialized.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTask(task: IKanbanTask, projectId: string): void {
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
    }
  | {
      type: typeof ADD_TASK;
      payload: IKanbanProject;
    }
  | {
      type: typeof UPDATE_TASK;
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

    case ADD_TASK: {
      return {
        ...state,
        isProjectChanged: false,
        project: action.payload
      };
    }

    case UPDATE_TASK: {
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
  workspace: IWorkspace;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    project: props.initialProject,
    workspace: props.workspace
  });

  const setProject = useCallback((project: IKanbanProject) => {
    dispatch({
      type: SET_PROJECT,
      payload: { ...project }
    });
  }, []);

  const saveProjectChanges = useCallback((project: IKanbanProject) => {
    updateProject(project).then(() => {
      getProjectById(project.id).then((updatedProject) => {
        dispatch({
          type: SAVE_PROJECT_CHANGES,
          payload: updatedProject
        });
      });
    });
  }, []);

  const addTask = useCallback((task: IKanbanTask, projectId: string) => {
    createTask(task, projectId).then((projectId) => {
      getProjectById(projectId).then((updatedProject) => {
        dispatch({
          type: ADD_TASK,
          payload: updatedProject
        });
      });
    });
  }, []);

  const updateTask = useCallback((task: IKanbanTask, projectId: string) => {
    editTask(task, projectId).then(() => {
      getProjectById(projectId).then((updatedProject) => {
        dispatch({
          type: UPDATE_TASK,
          payload: updatedProject
        });
      });
    });
  }, []);

  const value: ProjectState = useMemo(
    () => ({
      ...state,
      setProject,
      saveProjectChanges,
      addTask,
      updateTask
    }),
    [state, setProject, saveProjectChanges, addTask, updateTask]
  );

  return <ProjectContext.Provider value={value}>{props.children}</ProjectContext.Provider>;
};
