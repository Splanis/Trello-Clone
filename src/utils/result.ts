type Success<T> = ReturnType<typeof createSuccess>;
export const createSuccess = <T>(data: T) =>
  <const>{
    _type: 'SUCCESS',
    data
  };

type Failure = ReturnType<typeof createFailure>;
export const createFailure = (data: string) =>
  <const>{
    _type: 'FAILURE',
    data
  };

export type Result<T> = Success<T> | Failure;

export const isSuccess = <T>(result: Result<T>): result is Success<T> =>
  result._type === 'SUCCESS';
export const isFailure = <T>(result: Result<T>): result is Failure =>
  result._type === 'FAILURE';
