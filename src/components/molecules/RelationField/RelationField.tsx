import React, { FC } from 'react';
import Caution from '../../atoms/Caution/Caution';
import RelationPreview from './RelationPreview';
import RelationDropDown from './RelationDropDown';
import { IFieldComponent } from '../../../types/components';
import { IRelationField } from '../../../types/database';
import { useSelector } from 'react-redux';
import IRootStore from '../../../types/store/root';

interface CIRelationField extends IFieldComponent {
  field: IRelationField;
}

const RelationField: FC<CIRelationField> = ({
  field: recordField,
  data,
  edit,
  style,
  onFocus,
  onBlur,
  update
}) => {
  const { relatedCollections } = useSelector(({
    collections: { relatedCollections },
  }: IRootStore) => ({ relatedCollections }));
  
  const relatedCollection = relatedCollections.find((collection) => {
    return collection.id === recordField.options.collectionId;
  });

  if (!relatedCollection) {
    return (
      <Caution
        details="Collection not found"
        text={edit ? 'Collection not found' : ''}
      />
    );
  }

  let relatedField = relatedCollection.fields.find((field) => {
    return field.id === recordField.options.fieldId;
  });

  if (!relatedField) {
    return (
      <Caution
        details="Collection field not found"
        text={edit ? 'Collection field not found' : ''}
      />
    );
  }

  if (!edit) {
    return <RelationPreview field={relatedField} recordIds={data || []} />
  }

  const onChange = (selectedOptions: any) => {
    const updateVaue = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    update(updateVaue);
  }

  return (
    <RelationDropDown {...{
      reffField: recordField.options.fieldId,
      collection: relatedCollection,
      data,
      style,
      onFocus,
      onBlur,
      onChange,
      update
    }} />
  )
}

export default RelationField;
