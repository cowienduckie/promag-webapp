import { getProjects } from '../../../apis';
import { LoaderData } from '../interfaces';

export const loader = async (): Promise<LoaderData> => {
  const projects = getProjects();

  return { projects };
};
