import { executeQuery } from '@datocms/cda-client';

export const performRequest = async (query, variables = {}) => {
  const token = process.env.DATOCMS_READONLY_TOKEN;
  if (!token) {
    throw new Error('DATOCMS_READONLY_TOKEN is not defined');
  }
  
  return await executeQuery(query, {
    variables,
    token,
  });
};
