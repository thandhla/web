import { IRecordModel } from "../../../types/database";
import React, { FC } from "react";
import FieldFactory from "../FieldFactory";

export interface CIListRows {
  viewFields: any[];
  records: IRecordModel[];
}

const ListRows: FC<CIListRows> = ({ viewFields, records }) => (
  <>
    {records.map((record, index) =>
      <tr key={index} onClick={() => ''/*rowClicked(record.id)*/}>
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
