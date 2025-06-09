interface JwtPayload {
  exp: number;
  userId: string;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload: JwtPayload = JSON.parse(jsonPayload);
    const currentTime = Date.now() / 1000;

    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token && !isTokenExpired(token);
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('token');
  
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    return null;
  }

  return token;
}; 