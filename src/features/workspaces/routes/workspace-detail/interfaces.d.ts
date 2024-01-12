import { ISimplifiedProject } from '@/features/projects/types';

export interface LoaderData {
  workspace: IWorkspace;
  projects: ISimplifiedProject[];
}
