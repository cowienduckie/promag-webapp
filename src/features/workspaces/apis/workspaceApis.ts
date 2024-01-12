import { ISimplifiedProject } from '@/features/projects/types';
import { IMyWorkspaces, IWorkspace } from '@/features/workspaces/types/IWorkspace';
import { graphqlRequest } from '@/libs/axios';

export const getProjectsByWorkspace = (workspaceId: string): Promise<ISimplifiedProject[]> => {
  const operationName = 'GetProjectsByWorkspace';
  const query = `
    query ${operationName} {
      ${operationName}(query: { workspaceId: "${workspaceId}" }) {
        id
        name
        notes
        createdOn
        lastModifiedOn
        workspaceId
    }
  }`;

  return graphqlRequest<ISimplifiedProject[]>(operationName, query);
};

export const getWorkspaceById = (workspaceId: string): Promise<IWorkspace> => {
  const operationName = 'GetWorkspaceById';
  const query = `
    query ${operationName} {
        ${operationName}(query: { workspaceId: "${workspaceId}" }) {
            id
            name
            ownerId
            members {
                id
                firstName
                middleName
                lastName
                photoPath
                email
                userStatus
                createdOn
                lastModifiedOn
                address {
                    street
                    city
                    state
                    zipCode
                    country
                }
            }
            invitations {
                id
                firstName
                middleName
                lastName
                photoPath
                email
                userStatus
                createdOn
                lastModifiedOn
                address {
                    street
                    city
                    state
                    zipCode
                    country
                }
            }
        }
    }
  `;

  return graphqlRequest<IWorkspace>(operationName, query);
};

export const createWorkspace = (name: string): Promise<any> => {
  const operationName = 'CreateWorkspace';
  const mutation = `
    mutation ${operationName} {
        createWorkspace(createWorkspaceInput: { name: "${name}" }) {
            userId
            workspaceId
        }
    }
  `;

  interface ResponseType {
    userId: string;
    workspaceId: string;
  }

  return graphqlRequest<ResponseType>(operationName, mutation);
};

export const inviteUserToWorkspace = (workspaceId: string, email: string): Promise<boolean> => {
  const operationName = 'InviteUserToWorkspace';
  const mutation = `
    mutation ${operationName} {
        inviteUserToWorkspace(input: { workspaceId: "${workspaceId}", email: "${email}" })
    }
  `;

  return graphqlRequest<boolean>(operationName, mutation);
};

export const acceptWorkspaceInvitation = (workspaceId: string): Promise<boolean> => {
  const operationName = 'AcceptWorkspaceInvitation';
  const mutation = `
    mutation ${operationName} {
        acceptWorkspaceInvitation(input: { workspaceId: "${workspaceId}" })
    }
  `;

  return graphqlRequest<boolean>(operationName, mutation);
};

export const getMyWorkspaces = (): Promise<IMyWorkspaces> => {
  const operationName = 'Workspaces';
  const query = `
    query ${operationName} {
      ${operationName} {
        ownedWorkspaces {
            id
            name
            ownerId
            members {
                id
                firstName
                middleName
                lastName
                photoPath
                email
                userStatus
                createdOn
                lastModifiedOn
                address {
                    street
                    city
                    state
                    zipCode
                    country
                }
            }
            invitations {
                id
                firstName
                middleName
                lastName
                photoPath
                email
                userStatus
                createdOn
                lastModifiedOn
                address {
                    street
                    city
                    state
                    zipCode
                    country
                }
            }
        }
        memberWorkspaces {
            id
            name
            ownerId
            members {
                id
                firstName
                middleName
                lastName
                photoPath
                email
                userStatus
                createdOn
                lastModifiedOn
                address {
                    street
                    city
                    state
                    zipCode
                    country
                }
            }
            invitations {
                id
                firstName
                middleName
                lastName
                photoPath
                email
                userStatus
                createdOn
                lastModifiedOn
                address {
                    street
                    city
                    state
                    zipCode
                    country
                }
            }
        }
        pendingWorkspaces {
            id
            name
            ownerId
            members {
                id
                firstName
                middleName
                lastName
                photoPath
                email
                userStatus
                createdOn
                lastModifiedOn
                address {
                    street
                    city
                    state
                    zipCode
                    country
                }
            }
            invitations {
                id
                firstName
                middleName
                lastName
                photoPath
                email
                userStatus
                createdOn
                lastModifiedOn
                address {
                    street
                    city
                    state
                    zipCode
                    country
                }
            }
        }
    }
}`;

  return graphqlRequest<IMyWorkspaces>(operationName, query);
};
