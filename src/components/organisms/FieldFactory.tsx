import React from 'react';
import Caution from '../atoms/Caution/Caution';
import LineField from '../molecules/LineField';
import DropdownField from '../molecules/DropdownField';
import RelationField from '../molecules/RelationField';
import NumberField from '../molecules/NumberField';
/*
import EmailField from '../molecules/EmailField/EmailField';
import LinkField from '../molecules/LinkField/LinkField';
import DateField from '../molecules/DateField/DateField';
import MultiSelectField from '../molecules/MultiSelectField/MultiSelectField';
import TextBoxField from '../molecules/TextBoxField/TextBoxField';
*/

const FieldFactory = (props: any) => {
  switch (props.field.type) {
    case 'line':
      return <LineField { ...props } />;
    case 'dropdown':
      return <DropdownField { ...props } />;
    case 'relation':
      return <RelationField { ...props } />;
    case 'number':
      return <NumberField { ...props } />;
    /*
    case 'email':
      return <EmailField { ...props } />;
    case 'link':
      return <LinkField { ...props } />;
    case 'date':
      return <DateField { ...props } />;
    case 'multiselect':
      return <MultiSelectField { ...props } />;
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
