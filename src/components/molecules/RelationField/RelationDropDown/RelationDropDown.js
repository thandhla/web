import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const RelationDropDown = (props) => {
  const {
    data,
    collection,
    records,
    style,
    isFetchingTempRecords,
    tempRecords,
    getTempRecords,
    clearTempRecords,
    onChange,
  } = props;

  const [tempRecordsLoaded, setTempRecordsLoaded] = useState(false);
  const availableRecords = tempRecordsLoaded ? tempRecords : records;
  const recordOptions = availableRecords.map((record) => {
    const titleField = collection.title_field;
    return { value: record.id, label: record.fields[titleField] };
  });

  const selectedValues = data || [];
  const selected = recordOptions.filter((option) => {
    return selectedValues.find((id) => id == option.value);
  });

  const fetchOptions = () => {
    getTempRecords({
      collection_id: collection.id,
      sorts: [],
      filters: []
    });
    setTempRecordsLoaded(true);
  }

  useEffect(() => {
    return () => clearTempRecords();
  }, []);
  
  return (
    <div style={style}>
      <Select
        isMulti
        isLoading={isFetchingTempRecords}
        value={selected}
        options={recordOptions}
        onChange={onChange}
        onFocus={fetchOptions}
      />
    </div>
  );
}

export default RelationDropDown;
