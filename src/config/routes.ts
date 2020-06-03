
const routes = {
  home: '/',
  workspaces: {
    create: '/create-workspace',
    view: '/w/:id',
    edit: '/edit/w/:id',
  },
  collections: {
    create: '/:workspaceId/create-collection',
    view: '/c/:collection/:view',
    edit: '/edit/c/:id',
  }
};

export default routes;