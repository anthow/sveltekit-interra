import { executeQuery } from '@datocms/cda-client';
import { DATOCMS_READONLY_TOKEN } from '$env/static/private';

export const performRequest = async (query, variables = {}) => {
  return await executeQuery(query, {
    variables,
    token: DATOCMS_READONLY_TOKEN,
  });
};
