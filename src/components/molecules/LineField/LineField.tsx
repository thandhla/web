import React from 'react';
import { ICollectionField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

function LineField({
  field,
  data,
  edit,
  style,
  onFocus,
  onBlur,
  update
}: IFieldComponent) {
  const onChange = (e: any) => {
    update(field.id, e.target.value);
  }

  if (!edit) {
    return <div>{data}</div>;
  }

  return (
    <input
      type="text"
      value={data || ''}
      style={style}
      onChange={onChange}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}
    />
  )
}

export default LineField;
