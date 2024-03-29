import IToken from '../models/IToken';

const getToken = (): string | null => {
  const tokenString = localStorage.getItem('token') || '';
  if (!tokenString) return null;
  const userToken: IToken = JSON.parse(tokenString);
  return userToken?.token;
};

export default getToken;
