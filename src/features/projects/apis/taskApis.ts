import { graphqlRequest } from '@/libs/axios';

import { IKanbanTask } from '../types';

export const createTask = async (task: IKanbanTask, projectId: string): Promise<string> => {
  const operationName = 'CreateTask';
  const mutation = `
    mutation ${operationName}($input: CreateTaskCommandInput!) {
      createTask(input: $input) {
          projectId
          taskId
          statusCode
          errorCode
          errorMessage
      }
  }`;

  interface ResponseType {
    projectId?: string;
    taskId?: string;
    statusCode: number;
    errorCode?: string;
    errorMessage?: string;
  }

  await graphqlRequest<ResponseType>(operationName, mutation, {
    input: {
      name: task.name,
      notes: task.notes,
      startOn: task.startOn,
      dueOn: task.dueOn,
      sectionId: task.column,
      projectId: projectId
    }
  });
  return projectId;
};

export const editTask = async (task: IKanbanTask, projectId: string): Promise<void> => {
  const operationName = 'UpdateTask';
  const mutation = `
    mutation ${operationName}($input: UpdateTaskInput) {
        updateTask(input: $input)
    }
  `;

  await graphqlRequest<boolean>(operationName, mutation, {
    input: {
      id: task.id,
      name: task.name,
      notes: task.notes,
      completed: task.isCompleted,
      startOn: task.startOn,
      dueOn: task.dueOn,
      assigneeId: task.assignee,
      sectionId: task.column,
      projectId: projectId
    }
  });
};
