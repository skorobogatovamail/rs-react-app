import { createBrowserRouter } from 'react-router';

import App from '../App';
import { DetailsPanel } from '../features/DetailsPanel/DetailsPanel';
import { MainPage } from '../pages/MainPage/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MainPage />,
        children: [
          {
            index: true,
          },
          {
            path: 'details/:id',
            element: <DetailsPanel />,
          },
        ],
      },
    ],
  },
]);
