import React from 'react';
import { useLocation } from 'react-router-dom';
import RecordActionBar from '../organisms/RecordActionBar';
import RecordForm from '../organisms/RecordForm';

const BrowseRecordsTemplate = ({ breadcrumbs, header, children }: any) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const recordSearchParam = searchParams.get('r');

  return (
    <div>
      <div>
        <div className="header-link">{breadcrumbs}</div>
      </div>
      <h1>{header}</h1>
      <RecordActionBar />
      <div>{children}</div>
      {recordSearchParam &&
        <RecordForm record={recordSearchParam} />
      }
    </div>
  )
};

export default BrowseRecordsTemplate;
