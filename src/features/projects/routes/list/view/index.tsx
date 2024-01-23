import { ProjectOutlined } from '@ant-design/icons';
import { Card, Empty, Pagination } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { NavLink, useLoaderData, useRevalidator } from 'react-router-dom';

import { CardDeck } from '@/components/CardDeck';

import { AddProjectModal } from '../../../components/Modal/AddProjectModal';
import { LoaderData } from '../interfaces';

export const ProjectListPage = () => {
  const { projects, totalCount, pageIndex, pageSize } = useLoaderData() as LoaderData;
  const revalidator = useRevalidator();

  const onRefreshList = () => {
    revalidator.revalidate();
  };

  const onPaging = (page: number, pageSize: number) => {
    const url = new URL(window.location.toString());

    url.searchParams.set('pageIndex', page.toString());
    url.searchParams.set('pageSize', pageSize.toString());

    window.history.pushState(null, '', url);
    onRefreshList();
  };

  const projectCards = projects.map((project) => (
    <NavLink key={project.id} to={`/app/projects/detail/${project.id}`}>
      <Card
        title={
          <p className="truncate text-xl">
            <ProjectOutlined className={clsx('mr-2 align-baseline')} />
            {project.name}
          </p>
        }
        className="bg-base-100 border shadow-sm"
      >
        <p className="mb-2 text-base">
          <strong>Created On: </strong>
          {dayjs(project.createdOn).format('hh:mm MMM DD')}
        </p>
        {!!project.lastModifiedOn && (
          <p className="mb-2 text-base">
            <strong>Last Modified: </strong>
            {dayjs(project.lastModifiedOn).format('hh:mm MMM DD')}
          </p>
        )}
        <p className="line-clamp-2">{project.notes}</p>
      </Card>
    </NavLink>
  ));

  return (
    <div className={clsx('flex h-full flex-col p-5')}>
      <div className={clsx('my-5 flex flex-row justify-between px-2')}>
        <h1 className={clsx('text-2xl font-bold')}>Your Projects</h1>
        <AddProjectModal onRefreshList={onRefreshList} />
      </div>
      {projects.length > 0 ? (
        <>
          <CardDeck
            className={clsx('my-3 h-full bg-gray-100 p-10')}
            cards={projectCards}
            colNum={3}
            hGutter={24}
          />
          <div className={clsx('mt-3 flex flex-row-reverse')}>
            <Pagination
              total={totalCount}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              defaultCurrent={pageIndex}
              defaultPageSize={pageSize}
              onChange={onPaging}
            />
          </div>
        </>
      ) : (
        <Empty className={clsx('my-3')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};
