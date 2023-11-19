import { axios } from '@/libs/axios';
import { GetListQueryResponse } from '@/types/graphql-response';

import { ISimplifiedProject } from '../types';

export const getProjects = async (
  skip = 0,
  take = 10
): Promise<GetListQueryResponse<ISimplifiedProject>> => {
  const operationName = 'Projects';
  const query = `
    query ${operationName} {
      ${operationName}(skip: ${skip}, take: ${take}) {
          pageInfo {
              hasNextPage
              hasPreviousPage
          }
          items {
              id
              name
              notes
              createdOn
              lastModifiedOn
          }
      }
  }`;

  const graphqlQuery = {
    operationName: operationName,
    query: query,
    variables: {}
  };

  const response = await axios.post('/graphql', graphqlQuery);

  return response.data[operationName];
};
