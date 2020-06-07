import { ICollectionField, IRecordModel } from "../../../types/database";
import React from "react";
import FieldFactory from "../FieldFactory";

export interface IListRows {
  viewFields: any[];
  records: IRecordModel[];
}

const ListRows = ({ viewFields, records }: IListRows) => (
  <>
    {records.map((record) =>
      <tr key={record.id} onClick={() => ''/*rowClicked(record.id)*/}>
        {viewFields.map((viewfield, index) =>
          <td key={index}>
            <FieldFactory
              field={viewfield}
              data={record.fields[viewfield.id]}
            />
          </td>
        )}
      </tr>
    )}
  </>
);

export default ListRows;
