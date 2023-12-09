import { getMyProfile } from '../../../apis/profileApis';
import { LoaderData } from '../interfaces';

export const loader = async (): Promise<LoaderData> => {
  const myProfile = await getMyProfile();

  return { myProfile };
};
