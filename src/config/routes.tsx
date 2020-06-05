import React from 'react';
import HomePage from '../components/pages/HomePage';
import ReadWorkspacePage from '../components/pages/ReadWorkspacePage';
import AddWorkspacePage from '../components/pages/AddWorkspacePage'
import BrowseRecordsPage from '../components/pages/BrowseRecordsPage';
import AddCollectionPage from '../components/pages/AddCollectionPage';

const routes = {
  home: '/',
  workspaces: {
    read: '/w/:workspaceId',
    edit: '/edit/w/:workspaceId',
    add: '/create-workspace',
  },
  collections: {
    read: '/w/:workspaceId/c/:collectionId',
    edit: '/w/:workspaceId/c/:collectionId/edit',
    add: '/w/:workspaceId/create-collection',
  },
  records: {
    browse: '/w/:workspaceId/c/:collectionId/v/:viewId',
    read: {
      inView: '/c/:collectionId/v/:view/r/:recordId',
      inCollection: '/c/:collectionId/r/:recordId'
    }
  }
};

export const appRoutes = [
  {
    path: routes.home,
    exact: true,
    web: true,
    desktop: true,
    main: () => <HomePage />,
  },
  // Workspaces
  {
    path: routes.workspaces.read,
    exact: true,
    web: true,
    desktop: true,
    main: () => <ReadWorkspacePage />
  },
  {
    path: routes.workspaces.add,
    exact: true,
    web: true,
    desktop: true,
    main: () => <AddWorkspacePage />
  },
  // Collections
  {
    path: routes.collections.read,
    exact: true,
    web: true,
    desktop: true,
    main: () => <BrowseRecordsPage />
  },
  {
    path: routes.collections.add,
    exact: true,
    web: true,
    desktop: true,
    main: () => <AddCollectionPage />
  },
  // Records
  {
    path: routes.records.browse,
    exact: true,
    web: true,
    desktop: true,
    main: () => <BrowseRecordsPage />
  },
];

export default routes;
