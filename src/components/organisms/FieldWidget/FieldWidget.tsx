import React, { FC } from 'react';
import { ICollectionField } from '../../../types/database';
import { fieldIcon } from '../../../utils/icons'

interface CIFieldWidget {
  field: ICollectionField;
  style?: any;
}

const FieldWidget: FC<CIFieldWidget> = ({ field, style = {} }) => {
  return (
    <div style={style}>
      <span className="icon">{fieldIcon(field.type)}</span> {field.label}
    </div>
  )
}

export default FieldWidget;
