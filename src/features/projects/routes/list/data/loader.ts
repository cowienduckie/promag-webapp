import { getProjects } from '../../../apis';
import { LoaderData } from '../interfaces';

export const loader = async (): Promise<LoaderData> => {
  // Extract query params from URL
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const pageIndex = (params.get('pageIndex') ?? 1) as number;
  const pageSize = 9;

  // Query the API
  const skip = (pageIndex - 1) * pageSize;
  const take = pageSize;
  const queryResponse = await getProjects(skip, take);

  // Transform output
  const projects = queryResponse.items;
  const totalCount = queryResponse.totalCount;

  return { projects, totalCount, pageIndex, pageSize };
};
