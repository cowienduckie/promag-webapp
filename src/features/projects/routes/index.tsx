import { ProjectDetailLoader, ProjectDetailPage } from './detail';
import { ProjectListLoader, ProjectListPage } from './list';

export const ProjectRoutes = {
  path: 'projects',
  children: [
    {
      index: true,
      element: <ProjectListPage />,
      loader: ProjectListLoader
    },
    {
      path: 'detail/:projectId',
      element: <ProjectDetailPage />,
      loader: ProjectDetailLoader
    }
  ]
};
