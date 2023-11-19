import { ISimplifiedProject } from '../types';

export const getProjects = (): Array<ISimplifiedProject> => {
  const projects: Array<ISimplifiedProject> = [
    {
      id: '1',
      name: 'Project 1'
    },
    {
      id: '2',
      name: 'Project 2'
    },
    {
      id: '3',
      name: 'Project 3'
    },
    {
      id: '4',
      name: 'Project 4'
    },
    {
      id: '5',
      name: 'Project 5'
    }
  ];

  return projects;
};
