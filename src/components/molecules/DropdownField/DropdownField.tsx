import React, { useState } from 'react';
//import Select from 'react-select';
import { IFieldComponent } from '../../../types/components';
import { IDropDownField } from '../../../types/database';

interface IDropdownFieldComponent extends IFieldComponent {
  field: IDropDownField;
}

function DropdownField({
  field,
  data,
  edit,
  style,
  onFocus,
  onBlur,
  update
}: IDropdownFieldComponent) {
  const initialOption = field.options.choices.find((option: any) => option.value === data);

  //if (!edit) {
    return <div>{initialOption ? initialOption.label : ''}</div>;
  //}
}

export default DropdownField;
