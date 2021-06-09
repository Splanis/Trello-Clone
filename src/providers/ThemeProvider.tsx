import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, Theme } from '../theme/theme';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const ThemeContext = createContext(() => {});

const THEME_LOCAL_STORAGE_KEY = 'isLightTheme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const res = getFromLocalStorage(THEME_LOCAL_STORAGE_KEY);
    if (isBoolean(res)) return res;
    return true;
  });

  const toggleTheme = useCallback(() => {
    setIsLightTheme((prev) => !prev);
  }, []);

  useEffect(() => {
    saveToLocalStorage(THEME_LOCAL_STORAGE_KEY, isLightTheme);
  }, [isLightTheme]);

  const theme: Theme = useMemo(() => {
    if (isLightTheme) return lightTheme;

    return darkTheme;
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider value={toggleTheme}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

const isBoolean = (input: any): input is boolean => typeof input === 'boolean';

export const useToggleTheme = () => {
  const toggleTheme = useContext(ThemeContext);

  return toggleTheme;
};
