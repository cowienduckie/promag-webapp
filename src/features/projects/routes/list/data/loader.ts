import { getProjects } from '../../../apis';
import { ISimplifiedProject } from '../../../types';
import { LoaderData } from '../interfaces';

export const loader = async (): Promise<LoaderData> => {
  let projects: ISimplifiedProject[] = [];

  await getProjects(0, 10).then((response) => {
    projects = response.items;
  });

  return { projects };
};
