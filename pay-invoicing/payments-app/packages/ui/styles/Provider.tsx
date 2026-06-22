import { ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';

export interface PaydUiThemeProviderProps {
  children: ReactNode;
}

export const PaydUiThemeProvider = ({
  children,
}: PaydUiThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
