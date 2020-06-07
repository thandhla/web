import React from "react";
import _ from "lodash";
import { IRecordModel, IDropDownField } from "../../../types/database";
import ListRows, { IListRows } from "./ListRows";

interface IRecordsGroup {
  [key: string]: IRecordModel[];
}

interface IListGroups extends IListRows {
  by: string;
}

const ListGroups = ({ viewFields, records, by }: IListGroups) => {
  const groups = _.groupBy(records, `fields.${by}`);
  const field: IDropDownField = viewFields.find((viewField) => viewField.id === by);
  let rowGroups = [];

  for (const key in groups) {
    const records = groups[key];
    const choice = field.options.choices.find((choice) => choice.value == key);
    let groupLabel: string;
    
    if (choice) {
      groupLabel = choice.label;
    }

    rowGroups.push(() => (
      <>
        <td colSpan={viewFields.length}>{groupLabel}</td>
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