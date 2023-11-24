import { IKanbanProject } from './IProject';
import { IKanbanTask } from './ITask';

export interface ProjectState {
  project: IKanbanProject;
  isProjectChanged: boolean;
  setProject: (project: IKanbanProject) => void;
  saveProjectChanges: (project: IKanbanProject) => void;
  addTask: (task: IKanbanTask, projectId: string) => void;
}
