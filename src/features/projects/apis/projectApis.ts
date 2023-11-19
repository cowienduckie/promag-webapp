import { axios } from '@/libs/axios';
import { GetListQueryResponse } from '@/types/graphql-response';

import { IProject, ISimplifiedProject } from '../types';

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

export const getProjectById = async (projectId: string): Promise<IProject> => {
  return {
    id: projectId,
    name: 'ProMag',
    color: '#000000',
    createdOn: new Date(Date.now()),

    tasks: {
      'task-1': {
        id: 'task-1',
        name: 'Task 1',
        notes: 'Task 1 description',
        isCompleted: false,

        liked: false,
        likesCount: 0,

        column: 'column-1'
      }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        name: 'To-do',
        taskIds: ['task-1']
      },
      'column-2': {
        id: 'column-2',
        name: 'In Progress',
        taskIds: []
      },
      'column-3': {
        id: 'column-3',
        name: 'Done',
        taskIds: []
      }
    },

    columnOrder: ['column-1', 'column-2', 'column-3']
  };
};
