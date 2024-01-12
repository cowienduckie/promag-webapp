import { ISimplifiedTask } from '@/features/projects/types';
import { graphqlRequest } from '@/libs/axios';

export const getMyTasks = (): Promise<ISimplifiedTask[]> => {
  const operationName = 'MyTasks';
  const query = `
    query MyTasks {
    MyTasks {
        id
        name
        isCompleted
        startOn
        dueOn
        assignee
    }
}`;

  return graphqlRequest<ISimplifiedTask[]>(operationName, query);
};
