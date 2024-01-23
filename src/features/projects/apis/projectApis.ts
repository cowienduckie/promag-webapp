import { graphqlRequest } from '@/libs/axios';
import { GetListQueryResponse } from '@/types/graphql-response';

import { ICreateProjectDto, IKanbanProject, ISimplifiedProject } from '../types';

export const getProjects = (
  skip = 0,
  take = 9
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
              workspaceId
          }
      }
  }`;

  return graphqlRequest<GetListQueryResponse<ISimplifiedProject>>(operationName, query);
};

export const getProjectById = (projectId: string): Promise<IKanbanProject> => {
  const operationName = 'KanbanProject';
  const query = `
    query ${operationName} {
      ${operationName}(input: { projectId: "${projectId}" }) {
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
        workspaceId
    }
}`;

  return graphqlRequest<IKanbanProject>(operationName, query);
};

export const createProject = (project: ICreateProjectDto): Promise<any> => {
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

  return graphqlRequest<ResponseType>(operationName, mutation, {
    input: {
      name: project.name,
      notes: project.notes,
      color: project.color,
      dueDate: project.dueDate,
      workspaceId: project.workspaceId
    }
  });
};

export const updateProject = (project: IKanbanProject): Promise<any> => {
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

  return graphqlRequest<ResponseType>(operationName, mutation, {
    input: {
      projectId: project.id,
      columnOrder: [...project.columnOrder],
      tasks: { ...project.tasks }
    }
  });
};
