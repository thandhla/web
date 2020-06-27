import { IRecordModel } from "../../../types/database";
import React, { FC } from "react";
import FieldFactory from "../FieldFactory";
import { useHistory } from "react-router-dom";

export interface CIListRows {
  viewFields: any[];
  records: IRecordModel[];
}

const ListRows: FC<CIListRows> = ({ viewFields, records }) => {
  const history = useHistory();
  const rowClicked = (recordId: string) => history.push({ search: `?r=${recordId}` });
  
  return (
    <>
      {records.map((record, index) =>
        <tr key={index} onClick={() => rowClicked(record.id)}>
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
  )
};

export default ListRows;
