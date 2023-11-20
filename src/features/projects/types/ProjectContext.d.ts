import { IKanbanProject } from './IProject';

export interface ProjectState {
  project: IKanbanProject;
  isProjectChanged: boolean;
  setProject: (project: IKanbanProject) => void;
  saveProjectChanges: (project: IKanbanProject) => void;
}
