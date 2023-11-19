import { ProjectListLoader, ProjectListPage } from './list';

export const ProjectRoutes = {
  path: 'projects',
  children: [
    {
      index: true,
      element: <ProjectListPage />,
      loader: ProjectListLoader
    }
  ]
};
