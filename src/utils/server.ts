import { BASE_URL } from '../api';
import { ApiFetcherOptions, ApiFetcherResults } from '../types';

export const server = async <T>({
  params,
  url,
}: ApiFetcherOptions): Promise<ApiFetcherResults<T>> => {
  const res = await fetch(
    url ? url : `${BASE_URL}?${new URLSearchParams(params)}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();

  // if (errors) {
  //   throw new Error(errors.response.message);
  // }

  return { data };
};
