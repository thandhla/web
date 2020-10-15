import { IRecordModel, ICollectionField } from "../types/database";

const stringFields = ['line', 'number', 'email', 'url', 'date', 'time'];
const arrayFields = ['dropdown', 'relation', 'multiSelect', ];

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
    let value = data.fields[field.id];

    if (value === undefined) {
      if (stringFields.includes(field.type)) {
        value = "";
      }
      
      if (arrayFields.includes(field.type)) {
        value = [];
      }
    }

    record.fields[field.id] = value;
  }

  return record;
}

export default recordTemplate;
