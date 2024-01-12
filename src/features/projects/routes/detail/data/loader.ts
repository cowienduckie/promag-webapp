import { Params } from 'react-router-dom';

import { getWorkspaceById } from '@/features/workspaces/apis';

import { getProjectById } from '../../../apis';
import { LoaderData } from '../interfaces';

export const loader = async ({ params }: { params: Params<string> }): Promise<LoaderData> => {
  const { projectId } = params;

  const project = await getProjectById(projectId ?? '');
  const workspace = await getWorkspaceById(project.workspaceId ?? '');

  return { project, workspace };
};
