import { IProject } from './IProject';

export interface ProjectState {
  project: IProject;
  isProjectChanged: boolean;
  setProject: (project: IProject) => void;
  saveProjectChanges: (project: IProject) => void;
}
