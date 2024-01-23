import { CarryOutOutlined, ClockCircleOutlined, ProjectOutlined } from '@ant-design/icons';
import { Checkbox, Divider, Empty, Flex, List, Skeleton, Typography } from 'antd';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import { AppContext } from '@/contexts/app-context';
import { getProjects } from '@/features/projects/apis';
import { formatDate } from '@/utils/format';

import { getMyTasks } from '../../misc/apis/dashboardApis';
import { ISimplifiedProject, ISimplifiedTask } from '../../projects/types';

const greetArr = [
  'What are you doing that early? ',
  'Good Morning, ',
  'Good Afternoon, ',
  'Good Evening, '
];

const renderTask = (item: ISimplifiedTask) => {
  return (
    <List.Item
      key={item.id}
      actions={[
        <Checkbox key={`checkbox-${item.id}`} defaultChecked={item.isCompleted}>
          Done?
        </Checkbox>,
        <p key={`due-${item.id}`} className="text-black">
          {formatDate(item.dueOn)}
        </p>,
        <a key={`to-project-${item.id}`}>To Project</a>
      ]}
    >
      <List.Item.Meta
        avatar={
          item.dueOn && new Date(item.dueOn).getTime() <= new Date().getTime() ? (
            <CarryOutOutlined className={'text-xl text-red-600'} />
          ) : (
            <ClockCircleOutlined className={'text-xl text-red-600'} />
          )
        }
        title={item.name}
      />
    </List.Item>
  );
};

const renderProject = (item: ISimplifiedProject) => {
  return (
    <List.Item
      key={item.id}
      actions={[
        <Link key={`to-project-${item.id}`} to={`/app/projects/detail/${item.id}`}>
          Details
        </Link>
      ]}
    >
      <List.Item.Meta avatar={<ProjectOutlined className="text-xl" />} title={item.name} />
    </List.Item>
  );
};

export const Dashboard = () => {
  const [tasks, setTasks] = useState<ISimplifiedTask[]>([]);
  const [projects, setProjects] = useState<ISimplifiedProject[]>([]);
  const [greetString, setGreetString] = useState<string>('Hello, ');

  const { userLogin } = useContext(AppContext);

  useEffect(() => {
    getMyTasks().then((response) => {
      setTasks(response);
    });

    getProjects().then((response) => {
      setProjects(response.items);
    });
  }, [userLogin]);

  useEffect(() => {
    setGreetString(greetArr[Math.floor((new Date().getHours() / 24) * 4)]);
  }, [userLogin]);

  return (
    <Flex className={clsx('h-full p-10')} vertical gap="large">
      <Typography className={clsx('text-center')}>
        <Title level={5}>{formatDate(new Date().toLocaleString(), 'MMMM D, YYYY h:mm')}</Title>
        <Title level={3}>{greetString + (userLogin?.email ?? 'User') + '!'}</Title>
      </Typography>

      <Divider />

      <Flex justify="space-around" align="center">
        <Typography className={clsx('text-center')}>
          <Title level={4}>Total Tasks</Title>
          <Text>{tasks.length + ' items'}</Text>
        </Typography>
        <Typography className={clsx('text-center')}>
          <Title level={4}>Done Tasks</Title>
          <Text>{tasks.filter((t) => t.isCompleted).length + ' items'}</Text>
        </Typography>
        <Typography className={clsx('text-center')}>
          <Title level={4}>Uncompleted Tasks</Title>
          <Text>{tasks.filter((t) => !t.isCompleted).length + ' items'}</Text>
        </Typography>
        <Typography className={clsx('text-center')}>
          <Title level={4}>Overdue Tasks</Title>
          <Text>
            {tasks.filter(
              (t) =>
                !t.isCompleted && t.dueOn && new Date(t.dueOn).getTime() <= new Date().getTime()
            ).length + ' items'}
          </Text>
        </Typography>
      </Flex>

      <Divider />

      <Flex className={'h-full overflow-auto'} gap={'small'}>
        <div className={'w-1/2 border-r-2 px-5'}>
          <Typography.Title level={5}>My Tasks</Typography.Title>

          {tasks.length > 0 ? (
            <List
              itemLayout="vertical"
              pagination={{
                pageSize: 3
              }}
              dataSource={tasks.filter((t) => !t.isCompleted)}
              renderItem={renderTask}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
        <div className={'scrollable-projects h-full w-1/2 overflow-auto px-5'}>
          <Typography.Title level={5}>My Projects</Typography.Title>

          {projects.length > 0 ? (
            <InfiniteScroll
              dataLength={projects.length}
              next={() => {}}
              hasMore={false}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={
                <Divider plain>
                  <Link to={'/app/projects'}>See all projects</Link>
                </Divider>
              }
              scrollableTarget="scrollable-projects"
            >
              <List itemLayout="horizontal" dataSource={projects} renderItem={renderProject} />
            </InfiniteScroll>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </Flex>
    </Flex>
  );
};
