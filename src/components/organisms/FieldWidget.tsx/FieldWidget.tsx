import React, { FC } from 'react';
import { ICollectionField } from '../../../types/database';
import { fieldIcon } from '../../../utils/icons'

interface CIFieldWidget {
  field: ICollectionField;
}

const FieldWidget: FC<CIFieldWidget> = ({ field }) => {
  return (
    <div>
      <span className="icon">{fieldIcon(field.type)}</span> {field.label}
    </div>
  )
}

export default FieldWidget;
