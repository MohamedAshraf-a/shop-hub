import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token) {
      try {
        const userData = savedUser
          ? JSON.parse(savedUser)
          : {
              id: 1,
              name: 'John Doe',
              email: 'john@example.com',
              role: 'admin',
            };

        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: 1,
            name: 'John Doe',
            email,
            role: email.includes('admin') ? 'admin' : 'user',
          };

          localStorage.setItem('token', 'logged-in');
          localStorage.setItem('user', JSON.stringify(userData));

          setUser(userData);
          setIsAuthenticated(true);

          resolve({
            success: true,
            user: userData,
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const userData = {
            id: Date.now(),
            name,
            email,
            role: 'user',
          };

          localStorage.setItem('token', 'logged-in');
          localStorage.setItem('user', JSON.stringify(userData));

          setUser(userData);
          setIsAuthenticated(true);

          resolve({
            success: true,
            user: userData,
          });
        } else {
          reject(new Error('Registration failed'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}