import { ICollectionField, IRecordModel } from "../../../types/database";
import React from "react";

export interface IListRows {
  viewFields: ICollectionField[];
  records: IRecordModel[];
}

const ListRows = ({ viewFields, records }: IListRows) => (
  <>
    {records.map((record) =>
      <tr key={record.id} onClick={() => ''/*rowClicked(record.id)*/}>
        {viewFields.map((viewfield, index) =>
          <td key={index}>
            {record.fields[viewfield.id]}
          </td>
        )}
      </tr>
    )}
  </>
);

export default ListRows;
