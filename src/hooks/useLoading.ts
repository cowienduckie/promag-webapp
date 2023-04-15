import * as React from 'react';

export const useLoading = (initial = false) => {
  const [isLoading, setIsLoading] = React.useState(initial);

  const startLoading = React.useCallback(() => setIsLoading(true), []);
  const endLoading = React.useCallback(() => setIsLoading(false), []);
  const toggleLoading = React.useCallback(() => setIsLoading((state) => !state), []);

  return { isLoading, startLoading, endLoading, toggleLoading };
};
