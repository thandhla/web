import React, { FC } from 'react';

const HomepPage: FC = () => {
  const { ipcRenderer } = window.require("electron");
  const queries = {
    //*
    workspaces: {
      action: 'getWorkspaces'
    }
    //*/
    /*
    newWorkspace: {
      action: 'createWorkspace',
      args: {
        name: 'My workspace'
      }
    }
   //*/
  };

  console.log(ipcRenderer.sendSync('nbql', queries));
  
  return (
    <div>Home page</div>
  )
};

export default HomepPage;
