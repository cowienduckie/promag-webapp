import { Tabs } from 'antd';
import clsx from 'clsx';
import { Link, useLoaderData } from 'react-router-dom';

import { TaskCalendar } from '@/features/projects/components/Calendar';
import { TaskTable } from '@/features/projects/components/Table';

import { KanbanBoard } from '../../../components/KanbanBoard';
import { SaveProjectChangesModal } from '../../../components/Modal/SaveProjectChangesModal';
import { ProjectContextProvider } from '../../../contexts/project-context';
import { LoaderData } from '../interfaces';

export const ProjectDetailPage = () => {
  const { project, workspace } = useLoaderData() as LoaderData;

  const tabItems = [
    {
      label: `List View`,
      key: 'list-view',
      children: <TaskTable />
    },
    {
      label: `Kanban Board View`,
      key: 'kanban-view',
      children: <KanbanBoard />
    },
    {
      label: `Calendar View`,
      key: 'calendar-view',
      children: <TaskCalendar />
    }
  ];

  return (
    <ProjectContextProvider initialProject={project} workspace={workspace}>
      <div className={clsx('flex h-full flex-col p-5')}>
        <div className={clsx('my-5 flex flex-row justify-between px-2')}>
          <h1 className={clsx('text-2xl font-bold')}>
            <Link className={clsx('mr-2 text-gray-400 hover:text-black')} to={'/app/workspaces'}>
              Your Projects |
            </Link>
            {project.name}
          </h1>
          <SaveProjectChangesModal />
        </div>

        <Tabs
          className={clsx('my-3 h-full')}
          defaultActiveKey="kanban-view"
          type="card"
          size="large"
          items={tabItems}
        />
      </div>
    </ProjectContextProvider>
  );
};
