import { Badge, BadgeProps, Calendar, CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useContext } from 'react';

import { ProjectContext } from '@/features/projects/contexts/project-context';

export const TaskCalendar = () => {
  const context = useContext(ProjectContext);

  const monthCellRender = (value: Dayjs) => {
    const listData = Object.values(context.project.tasks).filter((item) => {
      if (item.dueOn && dayjs(item.dueOn).isSame(value, 'month')) {
        return item;
      }
    });

    return (
      <div className="notes-month">
        <section>{listData.length}</section>
        <span>Backlog number</span>
      </div>
    );
  };

  const getStatus = (column: string) => {
    switch (context.project.columns[column].name) {
      case 'To Do':
        return 'error';
      case 'In Progress':
        return 'warning';
      case 'Done':
        return 'success';
      default:
        return 'default';
    }
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = Object.values(context.project.tasks).filter(
      (item) => item.dueOn && dayjs(item.dueOn).isSame(value, 'date')
    );
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={getStatus(item.column) as BadgeProps['status']} text={item.name} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar className={'mx-5 my-2'} cellRender={cellRender} />;
};
