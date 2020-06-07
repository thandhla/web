import React, { FC } from 'react';
import { IFieldComponent } from '../../../types/components';
import { IDropDownField } from '../../../types/database';

interface CIDropdownField extends IFieldComponent {
  field: IDropDownField;
}

const DropdownField: FC<CIDropdownField> = ({
  field,
  data,
  edit,
  style,
  onFocus,
  onBlur,
  update
}) => {
  const initialOption = field.options.choices.find((option: any) => option.value === data);

  //if (!edit) {
    return <div>{initialOption ? initialOption.label : ''}</div>;
  //}
}

export default DropdownField;
