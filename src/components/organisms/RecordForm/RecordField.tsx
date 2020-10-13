import React, { FC, useState } from "react";
import FieldFactory from "../FieldFactory";
import FieldWidget from "../FieldWidget";

interface CIRecordField {
  field: any;
  data: any;
  update: any;
}

const RecordField: FC<CIRecordField> = ({ field, data, update }) => {
  const [focus, setFocus] = useState(false);
  
  return (
    <div className="record-field">
      <FieldWidget
        field={field}
        style={{
          marginTop: '20px',
          marginBottom: '10px',
          color: focus ? '#11f' : 'initial'
        }}
      />
      <FieldFactory
        edit
        field={field}
        data={data}
        style={{ width: '60%' }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        update={update}
      />
    </div>
  )
};

export default RecordField;
