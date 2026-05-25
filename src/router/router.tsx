import { createBrowserRouter } from 'react-router';

import App from '../App';
import { DetailsPanel } from '../features/DetailsPanel/DetailsPanel';
import { AboutPage } from '../pages/AboutPage/AboutPage';
import { MainPage } from '../pages/MainPage/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

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
      {
        element: <AboutPage />,
        path: 'about',
      },
      {
        element: <NotFoundPage />,
        path: '*',
      },
    ],
  },
]);
