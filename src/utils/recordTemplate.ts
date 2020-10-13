import { IRecordModel, ICollectionField } from "../types/database";

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
    record.fields[field.id] = data.fields[field.id];
  }

  return record;
}

export default recordTemplate;
