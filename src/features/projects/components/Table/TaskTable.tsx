import { Table } from 'antd';
import { useContext } from 'react';

import { ProjectContext } from '@/features/projects/contexts/project-context';
import { formatDate } from '@/utils/format';

export const TaskTable = () => {
  const context = useContext(ProjectContext);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Status',
      dataIndex: 'column',
      key: 'status',
      render: (value: string) => `${context.project.columns[value].name}`
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (value?: string) => {
        if (!value) {
          return '';
        }
        const member = context.workspace.members.find((member) => member.id === value);

        return member?.email;
      }
    },
    {
      title: 'Due On',
      dataIndex: 'dueOn',
      key: 'dueOn',
      render: (value: any) => (value ? formatDate(value) : '')
    },
    {
      title: 'Start On',
      dataIndex: 'startOn',
      key: 'startOn',
      render: (value: any) => (value ? formatDate(value) : '')
    }
  ];

  return (
    <Table
      className={'mx-5 my-2'}
      dataSource={Object.values(context.project.tasks)
        .sort((a, b) => {
          const sortOrder = ['To Do', 'In Progress', 'Done'];
          if (a.column === b.column) {
            return a.name.localeCompare(b.name);
          }
          return (
            sortOrder.indexOf(context.project.columns[a.column].name) -
            sortOrder.indexOf(context.project.columns[b.column].name)
          );
        })
        .map((task) => {
          return { ...task, key: task.id };
        })}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.notes}</p>,
        rowExpandable: (record) => record.name !== 'Not Expandable'
      }}
    />
  );
};
