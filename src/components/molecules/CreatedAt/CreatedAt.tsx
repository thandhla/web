import React, { FC } from 'react';
import { ICreatedAtField, IRecordModel } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CICreatedAtField extends IFieldComponent {
  field: ICreatedAtField;
  record: IRecordModel;
}

const CreatedAtField: FC<CICreatedAtField> = ({
  field,
  record,
  edit,
  style,
  onFocus,
  onBlur
}) => {
  const timestamp = new Date(record.createdAt);
  const data = timestamp.toDateString();

  if (!edit) {
    return <div>{data}</div>;
  }

  return (
    <input
      type="text"
      value={data}
      style={style}
      disabled
      onChange={() => {}}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default CreatedAtField;
