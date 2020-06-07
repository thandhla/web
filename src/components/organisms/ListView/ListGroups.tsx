import React, { FC } from "react";
import _ from "lodash";
import { IRecordModel, IDropDownField } from "../../../types/database";
import ListRows, { CIListRows } from "./ListRows";

interface IRecordsGroup {
  [key: string]: IRecordModel[];
}

interface CIListGroups extends CIListRows {
  by: string;
}

const ListGroups: FC<CIListGroups> = ({ viewFields, records, by }) => {
  const groups = _.groupBy(records, `fields.${by}`);
  const field: IDropDownField = viewFields.find((viewField) => viewField.id === by);
  let rowGroups = [];

  for (const key in groups) {
    const records = groups[key];
    const choice = field.options.choices.find((choice) => choice.value === key);
    let groupLabel: string;
    
    if (choice) {
      groupLabel = choice.label;
    }

    rowGroups.push(() => (
      <>
        <tr>
          <td colSpan={viewFields.length}>{groupLabel}</td>
        </tr>
        <ListRows {...{ viewFields, records }} />
      </>
    ));
  }

  return (
    <>
      {rowGroups.map((RowGroup: any, index) =>
        <RowGroup key={index} />
      )}
    </>
  )
};

export default ListGroups;