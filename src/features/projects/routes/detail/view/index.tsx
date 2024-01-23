import { Flex, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import clsx from 'clsx';
import { Link, useLoaderData } from 'react-router-dom';

import { TaskCalendar } from '../../../components/Calendar';
import { KanbanBoard } from '../../../components/KanbanBoard';
import { SaveProjectChangesModal } from '../../../components/Modal/SaveProjectChangesModal';
import { TaskTable } from '../../../components/Table';
import { ProjectContextProvider } from '../../../contexts/project-context';
import { LoaderData } from '../interfaces';

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

export const ProjectDetailPage = () => {
  const { project, workspace } = useLoaderData() as LoaderData;

  return (
    <ProjectContextProvider initialProject={project} workspace={workspace}>
      <Flex className={clsx('h-full max-h-full px-5 py-10')} vertical gap="large">
        <Flex className={clsx('px-2')} justify="space-between">
          <h1 className={clsx('text-2xl font-bold')}>
            <Link className={clsx('mr-2 text-gray-400 hover:text-black')} to={'/app/workspaces'}>
              Your Projects |
            </Link>
            {project.name}
          </h1>
          <SaveProjectChangesModal />
        </Flex>

        <Tabs className={clsx('min-h-0')} defaultActiveKey="kanban-view" type="card" size="large">
          {tabItems.map((item) => (
            <TabPane tab={item.label} key={item.key}>
              {item.children}
            </TabPane>
          ))}
        </Tabs>
      </Flex>
    </ProjectContextProvider>
  );
};
