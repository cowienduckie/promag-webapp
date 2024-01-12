import { Card, Col, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';

import { getMyTasks } from '@/features/misc/apis/dashboardApis';
import { ISimplifiedTask } from '@/features/projects/types';

export const Dashboard = () => {
  const [tasks, setTasks] = useState<ISimplifiedTask[]>([]);

  useEffect(() => {
    getMyTasks().then((response) => {
      setTasks(response);
    });
  }, []);

  return (
    <Row className={'m-10'} gutter={16}>
      <Col span={8}>
        <Card title={<p className={' my-3 text-center text-2xl'}>Total Tasks</p>} bordered={true}>
          <p className={'text-bold text-center text-4xl text-blue-500'}>
            {tasks.length + ' items'}
          </p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title={<p className={' my-3 text-center text-2xl'}>Done Tasks</p>} bordered={true}>
          <p className={'text-bold text-center text-4xl text-green-500'}>
            {tasks.filter((t) => t.isCompleted).length + ' items'}
          </p>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title={<p className={' my-3 text-center text-2xl'}>Incompleted Tasks</p>}
          bordered={true}
        >
          <p className={'text-bold text-center text-4xl text-red-500'}>
            {tasks.filter((t) => !t.isCompleted).length + ' items'}
          </p>
        </Card>
      </Col>
      <Col className={'mt-16'} span={24}></Col>
      <Col className={'mt-16'} span={24}>
        <Skeleton active />
      </Col>
      <Col className={'mt-16'} span={24}>
        <Skeleton active />
      </Col>
    </Row>
  );
};
