import { Input, MenuItem, Select, TextField } from "@material-ui/core";

import "./DataEditors.scss";

export enum ColumnType {
  TEXT = "TEXT",
  DATE = "DATE",
  COMBO = "COMBO",
  NUMBER = "NUMBER",
  PHONE = "PHONE",
  START_TIME = "START_TIME",
  END_TIME = "END_TIME",
  APPENDABLE_LIST = "APPENDABLE_LIST",
}

export const DateEditor = (p: any) => (
  <TextField
    //autoFocus
    className={p.row}
    id={`${p.column.key}-${p.rowIdx}`}
    type="date"
    value={p.row[p.column.key] || ""}
    onChange={(e) =>
      p.onRowChange({ ...p.row, [p.column.key]: e.target.value })
    }
    InputLabelProps={{
      shrink: true,
    }}
  />
);

export const TimeIntervalEditor = (p: any) => {
  const value: string = p.row[p.column.key] || "0:0";
  const splited: string[] = value.split("-");
  return splited.length === 3 ? (
    <div className="interval-editor">
      <Input
        //autoFocus
        type="text"
        id={`${p.column.key}-${p.rowIdx}-1`}
        value={splited[0] || ""}
        onChange={(e) => {
          splited[0] = e.target.value;
          p.onRowChange({ ...p.row, [p.column.key]: splited.join("-") });
        }}
      />
      -
      <Input
        //autoFocus
        type="text"
        id={`${p.column.key}-${p.rowIdx}-2`}
        value={splited[1] || ""}
        onChange={(e) => {
          splited[1] = e.target.value;
          p.onRowChange({ ...p.row, [p.column.key]: splited.join("-") });
        }}
      />
      -
      <Input
        //autoFocus
        type="text"
        id={`${p.column.key}-${p.rowIdx}-3`}
        value={splited[2] || ""}
        onChange={(e) => {
          splited[2] = e.target.value;
          p.onRowChange({ ...p.row, [p.column.key]: splited.join("-") });
        }}
      />
    </div>
  ) : (
    <></>
  );
};

export const TextEditor = (p: any) => (
  <Input
    //autoFocus
    id={`${p.column.key}-${p.rowIdx}`}
    value={p.row[p.column.key] || ""}
    onChange={(e) =>
      p.onRowChange({ ...p.row, [p.column.key]: e.target.value })
    }
  />
);

export const NumberEditor = (p: any) => (
  <Input
    //autoFocus
    id={`${p.column.key}-${p.rowIdx}`}
    type="number"
    value={p.row[p.column.key] || ""}
    onChange={(e) => {
      p.onRowChange({ ...p.row, [p.column.key]: e.target.value });
    }}
  />
);

export const PhoneEditor = (p: any) => {
  const value: string = p.row[p.column.key] || "--";
  const splited: string[] = value.split("-");
  return splited.length === 3 ? (
    <div className="phone-editor">
      <Input
        //autoFocus
        type="text"
        id={`${p.column.key}-${p.rowIdx}-1`}
        value={splited[0] || ""}
        onChange={(e) => {
          splited[0] = e.target.value;
          p.onRowChange({ ...p.row, [p.column.key]: splited.join("-") });
        }}
      />
      -
      <Input
        //autoFocus
        type="text"
        id={`${p.column.key}-${p.rowIdx}-2`}
        value={splited[1] || ""}
        onChange={(e) => {
          splited[1] = e.target.value;
          p.onRowChange({ ...p.row, [p.column.key]: splited.join("-") });
        }}
      />
      -
      <Input
        //autoFocus
        type="text"
        id={`${p.column.key}-${p.rowIdx}-3`}
        value={splited[2] || ""}
        onChange={(e) => {
          splited[2] = e.target.value;
          p.onRowChange({ ...p.row, [p.column.key]: splited.join("-") });
        }}
      />
    </div>
  ) : (
    <></>
  );
};

export const TimeEditor = (defaultValue?: string) => (p: any) =>
  (
    <TextField
      id={`${p.column.key}-${p.rowIdx}`}
      type="time"
      value={p.row[p.column.key] || ""}
      defaultValue={defaultValue}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 60, // 5 min
      }}
      onChange={(e) => {
        console.log(e.target.value, p.column.key);
        p.onRowChange({ ...p.row, [p.column.key]: e.target.value });
      }}
    />
  );

export const ComboEditor =
  (comboArray?: { value: string; label: string }[]) => (p: any) =>
    comboArray ? (
      <Select
        //autoFocus
        value={
          p.row[p.column.key] === undefined || p.row[p.column.key] === null
            ? ""
            : p.row[p.column.key]
        }
        onChange={(e) =>
          p.onRowChange({ ...p.row, [p.column.key]: e.target.value })
        }
      >
        {comboArray &&
          comboArray.map((option, i) => (
            <MenuItem
              key={`${p.column.key}-${i}th-option`}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
      </Select>
    ) : (
      <></>
    );

export interface CommonColumnI {
  key: string;
  name: string;
  type?: ColumnType;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  comboArray?: { value: string; label: string }[];
  appendableListKey?: string[];
  editable?: boolean;
  visible?: boolean;
  mandatory?: boolean;
}
