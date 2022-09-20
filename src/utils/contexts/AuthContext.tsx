import React, { useContext, useState } from 'react';
import { getAuth } from 'firebase/auth';

const useProviderSettings = () => {
  const [theme, setTheme] = useState('white');

  const auth = getAuth();
  // @ts-ignore
  const signup = (email, password) => {};

  return {
    theme,
    setTheme,
  };
};
type SettingsContextData = ReturnType<typeof useProviderSettings>;

const AuthContext = React.createContext<SettingsContextData | null>(null);

type props = {
  // eslint-disable-next-line no-undef
  children: JSX.Element;
};

export const AuthProvider: React.FC<props> = ({ children }) => {
  const value = useProviderSettings();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) throw new Error('useAuth must be used inside AuthProvider');

  return auth;
};
