import { IRecordModel, ICollectionField } from "../types/database";

const stringFields = ['line', 'number', 'email', 'url', 'date', 'time'];
const arrayFields = ['dropdown', 'relation', 'multiselect', ];

/**
 * Is used to make sure that when a record is passed to the form no fields are missing
 */
const recordTemplate = (template: ICollectionField[], data: any): IRecordModel => {
  let record: IRecordModel = {
    id: data.id,
    collectionId: data.collectionId,
    fields: {}
  };
  
  for (const field of template) {
    const value = data.fields[field.id];

    if (stringFields.includes(field.type)) {
      record.fields[field.id] = value !== undefined ? value : "";
    }
    
    if (arrayFields.includes(field.type)) {
      record.fields[field.id] = value !== undefined ? value : [];
    }
  }

  return record;
}

export default recordTemplate;
