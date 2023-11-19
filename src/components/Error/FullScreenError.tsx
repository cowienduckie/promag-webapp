import { NavLink, useRouteError } from 'react-router-dom';

import { IError } from '@/types/error';

export const FullScreenError = () => {
  const error = useRouteError() as IError;

  return (
    <div className="m-auto flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-4 text-3xl">Oops!</h1>
      <h1 className="my-4 text-3xl">
        Sorry, an unexpected error has occurred.{' '}
        <NavLink to="/" className="text-blue-800 hover:text-blue-500 hover:underline">
          Back to Home
        </NavLink>
      </h1>
      <p className="my-4 text-2xl">
        <strong>[{error.status}]</strong> {error.statusText || error.message}
      </p>
    </div>
  );
};
