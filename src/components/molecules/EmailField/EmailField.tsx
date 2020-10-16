import React, { FC } from 'react';
import { IEmailField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CIEmailField extends IFieldComponent {
  field: IEmailField;
}

const EmailField: FC<CIEmailField> = ({
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
      type="email"
      value={data || ''}
      style={style}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default EmailField;
