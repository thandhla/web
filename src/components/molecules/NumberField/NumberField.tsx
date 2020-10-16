import React, { FC } from 'react';
import { INumberField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CINumberField extends IFieldComponent {
  field: INumberField;
}

const NumberField: FC<CINumberField> = ({
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
      type="number"
      value={data || ''}
      style={style}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default NumberField;
