export const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('account_info')).token}`
  },
  validateStatus: (status) => status <= 500,
};
