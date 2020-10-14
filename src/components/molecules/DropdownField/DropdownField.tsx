import React, { FC } from 'react';
import Select from 'react-select';
import { IFieldComponent } from '../../../types/components';
import { IDropDownField, IDropDownFieldChoice } from '../../../types/database';

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
  const initialOption = field.options.choices.find((option: IDropDownFieldChoice) => option.value === data);
  
  const onChange = (selectedOption: any) => {
    update(selectedOption.value);
  };

  if (!edit) {
    return <div>{initialOption ? initialOption.label : ''}</div>;
  }

  return (
    <div style={style}>
      <Select
        value={initialOption}
        options={field.options.choices}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

export default DropdownField;
