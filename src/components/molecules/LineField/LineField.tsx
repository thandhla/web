import React, { FC } from 'react';
import { ILineField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CILineField extends IFieldComponent {
  field: ILineField;
}

const LineField: FC<CILineField> = ({
  field,
  data,
  edit,
  style,
  onFocus,
  onBlur,
  update
}) => {
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
