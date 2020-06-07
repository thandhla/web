import React from 'react';
import RecordActionBar from '../organisms/RecordActionBar';

const CollectionViewsTemplate = ({ breadcrumbs, header, children }: any) => (
  <div>
    <div>
      <div className="header-link">{breadcrumbs}</div>
    </div>
    <h1>{header}</h1>
    <RecordActionBar />
    <div>{children}</div>
  </div>
);

export default CollectionViewsTemplate;
