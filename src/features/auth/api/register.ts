import { useMutation } from '@tanstack/react-query';

import { axios } from '@/libs/axios';
import { MutationConfig } from '@/libs/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { UserResponse } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  return axios.post('/auth/register', data);
};

type MutationFnType = typeof registerWithEmailAndPassword;

type UseRegisterWithEmailAndPasswordOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useRegisterWithEmailAndPassword = ({
  config
}: UseRegisterWithEmailAndPasswordOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: () => {},
    onError: () => {
      addNotification({
        type: 'error',
        title: 'There was an error registering'
      });
    },
    onSuccess: (data: UserResponse) => {
      addNotification({
        type: 'success',
        title: `${data.user.email} has registered successfully!`
      });
    },
    ...config,
    mutationFn: registerWithEmailAndPassword
  });
};
