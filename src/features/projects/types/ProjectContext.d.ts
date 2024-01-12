import { IWorkspace } from '@/features/workspaces/types/IWorkspace';

import { IKanbanProject } from './IProject';
import { IKanbanTask } from './ITask';

export interface ProjectState {
  project: IKanbanProject;
  workspace: IWorkspace;
  isProjectChanged: boolean;
  setProject: (project: IKanbanProject) => void;
  saveProjectChanges: (project: IKanbanProject) => void;
  addTask: (task: IKanbanTask, projectId: string) => void;
  updateTask: (task: IKanbanTask, projectId: string) => void;
}
