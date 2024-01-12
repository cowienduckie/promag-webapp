import { Params } from 'react-router-dom';

import { getProjectsByWorkspace, getWorkspaceById } from '@/features/workspaces/apis';

import { LoaderData } from '../interfaces';

export const loader = async ({ params }: { params: Params<string> }): Promise<LoaderData> => {
  const { workspaceId } = params;
  const workspace = await getWorkspaceById(workspaceId ?? '');
  const projects = await getProjectsByWorkspace(workspaceId ?? '');

  return { workspace, projects };
};
