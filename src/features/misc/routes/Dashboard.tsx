import { Col, Divider, Flex, Row, Skeleton, Typography } from 'antd';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/contexts/app-context';
import { formatDate } from '@/utils/format';

import { getMyTasks } from '../../misc/apis/dashboardApis';
import { ISimplifiedTask } from '../../projects/types';

const greetArr = [
  'What are you doing that early? ',
  'Good Morning, ',
  'Good Afternoon, ',
  'Good Evening, '
];

export const Dashboard = () => {
  const [tasks, setTasks] = useState<ISimplifiedTask[]>([]);
  const [greetString, setGreetString] = useState<string>('Hello, ');

  const { userLogin } = useContext(AppContext);

  useEffect(() => {
    getMyTasks().then((response) => {
      setTasks(response);
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
          <Text>{tasks.filter((t) => !t.isCompleted).length + ' items'}</Text>
        </Typography>
      </Flex>

      <Divider />

      <Row className={'overflow-auto'} gutter={32}>
        <Col span={12}>
          <Typography.Title level={5}>My Tasks</Typography.Title>

          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </Col>
        <Col span={12}>
          <Typography.Title level={5}>My Projects</Typography.Title>

          <Skeleton active />
          <Skeleton active />
        </Col>
      </Row>
    </Flex>
  );
};
