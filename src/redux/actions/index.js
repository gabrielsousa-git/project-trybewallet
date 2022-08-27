export const EMAIL_ACTION = 'EMAIL_ACTION';

export const addEmailAction = (user) => ({
  type: EMAIL_ACTION,
  user,
});
