import React from "react";
import _ from "lodash";
import { IRecordModel } from "../../../types/database";
import ListRows, { IListRows } from "./ListRows";

interface IRecordsGroup {
  [key: string]: IRecordModel[];
}

interface IListGroups extends IListRows {
  by: string;
}

const ListGroups = ({ viewFields, records, by }: IListGroups) => {
  const groups = _.groupBy(records, `fields.${by}`);

  let rowGroups = [];
  const field = viewFields.find((viewField) => viewField.id === by);
  let options;

  if (field) {
    options = field.options;
  }
  
  for (const key in groups) {
    const records = groups[key];
    const option = options.find((option: any) => option.value == key);
    let groupLabel: string;
    
    if (option) {
      groupLabel = option.label;
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
        /*<ListRows {...{ viewFields, records }} />*/
      )}
    </>
  )
};

export default ListGroups;