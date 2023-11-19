import { IProject } from './IProject';

export interface ProjectState {
  project: IProject;
  setProject: (project: IProject) => void;
}
