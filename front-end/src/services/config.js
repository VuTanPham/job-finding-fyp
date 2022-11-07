export const config = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  validateStatus: (status) => status <= 500,
});
