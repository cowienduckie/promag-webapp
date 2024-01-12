import { Divider } from 'antd';
import clsx from 'clsx';
import { Link, useLoaderData } from 'react-router-dom';

import { KanbanBoard } from '../../../components/KanbanBoard';
import { SaveProjectChangesModal } from '../../../components/Modal/SaveProjectChangesModal';
import { ProjectContextProvider } from '../../../contexts/project-context';
import { LoaderData } from '../interfaces';

export const ProjectDetailPage = () => {
  const { project, workspace } = useLoaderData() as LoaderData;

  return (
    <ProjectContextProvider initialProject={project} workspace={workspace}>
      <div className={clsx('m-0 h-full')}>
        <div className={clsx('justify m-10 mb-2 flex flex-row justify-between')}>
          <h1 className={clsx('text-2xl font-bold')}>
            <Link className={clsx('mr-2 text-gray-400 hover:text-black')} to={'/app/projects'}>
              Your Projects |
            </Link>
            {project.name}
          </h1>
          <SaveProjectChangesModal />
        </div>
        <Divider />
        <KanbanBoard />
      </div>
    </ProjectContextProvider>
  );
};
