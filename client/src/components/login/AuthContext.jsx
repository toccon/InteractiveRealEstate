import { createContext, useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signUp = async (email, password) => {
    return Auth.signUp({
      username: email,
      password,
      attributes: { email }
    });
  };

  const signIn = async (email, password) => {
    const result = await Auth.signIn(email, password);
    setUser(result);
  };

  const signOut = async () => {
    await Auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}