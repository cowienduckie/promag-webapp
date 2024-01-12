import { MyWorkspacePage } from '@/features/workspaces/routes/my-workspaces';
import { MyWorkspacesLoader } from '@/features/workspaces/routes/my-workspaces/data';
import { WorkspaceDetailPage } from '@/features/workspaces/routes/workspace-detail';
import { WorkspaceDetailLoader } from '@/features/workspaces/routes/workspace-detail/data';

export const WorkspaceRoutes = {
  path: 'workspaces',
  children: [
    {
      index: true,
      element: <MyWorkspacePage />,
      loader: MyWorkspacesLoader
    },
    {
      path: 'detail/:workspaceId',
      element: <WorkspaceDetailPage />,
      loader: WorkspaceDetailLoader
    }
  ]
};
