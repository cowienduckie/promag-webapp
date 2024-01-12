import { getMyWorkspaces } from '../../../apis';
import { LoaderData } from '../interfaces';

export const loader = async (): Promise<LoaderData> => {
  const myWorkspaces = await getMyWorkspaces();

  return { myWorkspaces };
};
