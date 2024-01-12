import { IWorkspace } from '@/features/workspaces/types/IWorkspace';

import { IKanbanProject } from '../../types';

export interface LoaderData {
  project: IKanbanProject;
  workspace: IWorkspace;
}
