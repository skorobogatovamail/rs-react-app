import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';

import messages from '../../messages/en.json';
import { ThemeProvider } from '../context/ThemeContext';
import { setupStore } from '../store/store';

export const TestProviders: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <NextIntlClientProvider locale="en" messages={messages}>
    <Provider store={setupStore()}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  </NextIntlClientProvider>
);
