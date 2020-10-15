import React, { FC } from 'react';
import { ILineField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CILineField extends IFieldComponent {
  field: ILineField;
}

const UrlField: FC<CILineField> = ({
  field,
  data,
  edit,
  style,
  onFocus,
  onBlur,
  update
}) => {
  const onChange = (e: any) => {
    update(e.target.value);
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
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default UrlField;
