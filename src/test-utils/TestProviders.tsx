import { Provider } from 'react-redux';

import { ThemeProvider } from '../context/ThemeContext';
import { setupStore } from '../store/store';

export const TestProviders: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Provider store={setupStore()}>
    <ThemeProvider>{children}</ThemeProvider>
  </Provider>
);
