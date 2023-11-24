import { getProjects } from '../../../apis';
import { LoaderData } from '../interfaces';

export const loader = async (): Promise<LoaderData> => {
  const queryResponse = await getProjects(0, 10);
  const projects = queryResponse.items;

  return { projects };
};
