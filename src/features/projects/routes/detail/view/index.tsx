import { Divider } from 'antd';
import clsx from 'clsx';
import { useLoaderData } from 'react-router-dom';

import { KanbanBoard } from '../../../components/KanbanBoard';
import { SaveProjectChangesModal } from '../../../components/Modal/SaveProjectChangesModal';
import { ProjectContextProvider } from '../../../contexts/project-context';
import { LoaderData } from '../interfaces';

export const ProjectDetailPage = () => {
  const { project } = useLoaderData() as LoaderData;

  return (
    <ProjectContextProvider initialProject={project}>
      <div className={clsx('m-0 h-full')}>
        <div className={clsx('justify m-10 mb-5 flex flex-row justify-between')}>
          <h1 className={clsx('text-2xl font-bold')}>
            PROJECT {'>'} {project.name.toLocaleUpperCase()}
          </h1>
          <SaveProjectChangesModal />
        </div>
        <Divider />
        <KanbanBoard />
      </div>
    </ProjectContextProvider>
  );
};
