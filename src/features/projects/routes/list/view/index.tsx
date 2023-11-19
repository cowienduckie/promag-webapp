import { Card } from 'antd';
import { NavLink, useLoaderData } from 'react-router-dom';

import { CardDeck } from '@/components/CardDeck';

import { LoaderData } from '../interfaces';

export const ProjectListPage = () => {
  const { projects } = useLoaderData() as LoaderData;

  const projectCards = projects.map((project) => (
    <NavLink key={project.id} to={`/app/projects/detail/${project.id}`}>
      <Card
        title={<p className="text-xl font-bold">{project.name.toLocaleUpperCase()}</p>}
        className="bg-base-100 border shadow-sm"
      >
        <p className="mb-2 text-base">
          <strong>ID: </strong> {project.id}
        </p>
        <p className="mb-2 text-base">
          <strong>Name: </strong> {project.name}
        </p>
      </Card>
    </NavLink>
  ));

  return (
    <div className="m-6 flex h-full flex-col">
      <h1 className="my-5 text-2xl font-bold">PROJECT LIST</h1>
      <CardDeck className="bg-gray-100 p-10" cards={projectCards} colNum={4} hGutter={24} />
    </div>
  );
};
