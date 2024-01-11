import { graphqlRequest } from '@/libs/axios';

import { IProfile } from '../types';

export const getMyProfile = (): Promise<IProfile> => {
  const operationName = 'Me';
  const query = `
    query ${operationName} {
      ${operationName} {
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
}`;

  return graphqlRequest<IProfile>(operationName, query);
};
