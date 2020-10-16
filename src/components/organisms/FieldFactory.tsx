import React from 'react';
import Caution from '../atoms/Caution/Caution';
import LineField from '../molecules/LineField';
import DropdownField from '../molecules/DropdownField';
import RelationField from '../molecules/RelationField';
import NumberField from '../molecules/NumberField';
import EmailField from '../molecules/EmailField';
import UrlField from '../molecules/UrlField';
import MultiSelectField from '../molecules/MultiSelectField';
import CreatedAt from '../molecules/CreatedAt'
import UpdatedAt from '../molecules/UpdatedAt'
/*
import DateField from '../molecules/DateField/DateField';
import TextBoxField from '../molecules/TextBoxField/TextBoxField';
*/

const FieldFactory = (props: any) => {
  const needsRecord = ['createdAt', 'updatedAt'];
  let fieldProps: any;

  if (needsRecord.includes(props.field.type)) {
    fieldProps = props
  } else {
    let { record, ...restOfProps } = props;
    
    fieldProps = {
      ...restOfProps,
      data: props.record.fields[props.field.id]
    };
  }

  switch (props.field.type) {
    case 'line':
      return <LineField { ...fieldProps } />;
    case 'dropdown':
      return <DropdownField { ...fieldProps } />;
    case 'relation':
      return <RelationField { ...fieldProps } />;
    case 'number':
      return <NumberField { ...fieldProps } />;
    case 'email':
      return <EmailField { ...fieldProps } />;
    case 'url':
      return <UrlField { ...fieldProps } />;
    case 'multiSelect':
      return <MultiSelectField { ...fieldProps } />;
    case 'createdAt':
      return <CreatedAt { ...fieldProps } />;
    case 'updatedAt':
      return <UpdatedAt { ...fieldProps } />;
    /*
    case 'date':
      return <DateField { ...props } />;
    case 'textbox':
      return <TextBoxField { ...props } />;
    */
    default:
      return (
        <Caution
          details={`Unknown field type: ${props.field.type}`}
          text={props.edit ? 'Field type error' : ''}
        />
      );
  }
}

export default FieldFactory;
