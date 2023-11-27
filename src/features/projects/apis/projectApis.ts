import { axios, graphqlRequest } from '@/libs/axios';
import { GetListQueryResponse } from '@/types/graphql-response';

import { ICreateProjectDto, IKanbanProject, ISimplifiedProject } from '../types';

export const getProjects = async (
  skip = 0,
  take = 10
): Promise<GetListQueryResponse<ISimplifiedProject>> => {
  const operationName = 'Projects';
  const query = `
    query ${operationName} {
      ${operationName}(skip: ${skip}, take: ${take}) {
          totalCount
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

export const getProjectById = async (projectId: string): Promise<IKanbanProject> => {
  const operationName = 'KanbanProject';
  const query = `
    query KanbanProject {
      KanbanProject(input: { projectId: "${projectId}" }) {
        tasks
        columns
        id
        name
        notes
        color
        dueDate
        createdOn
        lastModifiedOn
        columnOrder
    }
}`;

  return await graphqlRequest<IKanbanProject>(operationName, query);
};

export const createProject = async (project: ICreateProjectDto): Promise<void> => {
  const operationName = 'CreateProject';
  const mutation = `
    mutation ${operationName}($input: CreateProjectCommandInput!) {
      createProject(input: $input) {
          projectId
          statusCode
          errorCode
          errorMessage
      }
  }`;

  interface ResponseType {
    projectId?: string;
    statusCode: number;
    errorCode?: string;
    errorMessage?: string;
  }

  await graphqlRequest<ResponseType>(operationName, mutation, {
    input: {
      name: project.name,
      notes: project.notes,
      color: project.color,
      dueDate: project.dueDate
    }
  });
};

export const updateProject = async (project: IKanbanProject): Promise<string> => {
  const operationName = 'UpdateKanbanProject';
  const mutation = `
    mutation ${operationName}($input: UpdateKanbanProjectCommandInput!) {
      updateKanbanProject(input: $input) {
          projectId
          statusCode
          errorCode
          errorMessage
      }
  }`;

  interface ResponseType {
    projectId?: string;
    statusCode: number;
    errorCode?: string;
    errorMessage?: string;
  }

  await graphqlRequest<ResponseType>(operationName, mutation, {
    input: {
      projectId: project.id,
      columnOrder: [...project.columnOrder],
      tasks: { ...project.tasks }
    }
  });

  return project.id;
};
