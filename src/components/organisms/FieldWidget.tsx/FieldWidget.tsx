import React from 'react';
import { ICollectionField } from '../../../types/database';
import { fieldIcon } from '../../../utils/icons'

const FieldWidget = ({ field }: {
  field: ICollectionField
}) => {
  return (
    <div>
      <span className="icon">{fieldIcon(field.type)}</span> {field.label}
    </div>
  )
}

export default FieldWidget;
