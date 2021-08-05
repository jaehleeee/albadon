import { Input, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./CommonDataGrid.scss";

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
    autoFocus
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
        autoFocus
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
        autoFocus
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
        autoFocus
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
    autoFocus
    id={`${p.column.key}-${p.rowIdx}`}
    value={p.row[p.column.key] || ""}
    onChange={(e) =>
      p.onRowChange({ ...p.row, [p.column.key]: e.target.value })
    }
  />
);

export const NumberEditor = (p: any) => (
  <Input
    autoFocus
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
        autoFocus
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
        autoFocus
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
        autoFocus
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
        p.onRowChange({ ...p.row, [p.column.key]: e.target.value });
      }}
    />
  );

export const ComboEditor =
  (comboArray?: { value: string; label: string }[]) => (p: any) =>
    comboArray ? (
      <Select
        autoFocus
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

export const AppendableListEditor =
  (appendableRowKeys?: string[]) => (p: any) => {
    return <></>;
  };

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
}

export interface CommonDataGridI {
  columns: CommonColumnI[];
  rows: any[];
  title: React.ReactNode;
  rowLinkable?: boolean;
  rowLink?: string;
  rowLinkKey?: string;
  additionalProps?: any; //prop for custom option
}

export const CommonDataGrid: React.FC<CommonDataGridI> = ({
  columns,
  rows,
  title,
  rowLinkable = false,
  rowLink = "",
  rowLinkKey = "",
  additionalProps,
}) => {
  const [editedRows, setEditedRows] = useState<any[]>([]);
  const [editTarget, setEditTarget] = useState<any>(null);
  const history = useHistory();
  useEffect(() => {
    setEditedRows(rows);
  }, [rows]);

  const getColumns = (columns: CommonColumnI[]) => {
    return [...columns].map((column) => {
      let editor;
      switch (column.type) {
        case ColumnType.TEXT:
          editor = TextEditor;
          break;
        case ColumnType.NUMBER:
          editor = NumberEditor;
          break;
        case ColumnType.PHONE:
          editor = PhoneEditor;
          break;
        case ColumnType.DATE:
          editor = DateEditor;
          break;
        case ColumnType.COMBO:
          editor = ComboEditor(column.comboArray);
          break;
        case ColumnType.START_TIME:
          editor = TimeEditor(additionalProps?.defaultStartTime);
          break;
        case ColumnType.END_TIME:
          editor = TimeEditor(additionalProps?.defaultEndTime);
          break;
      }

      const getClassName = (p: any) => {
        if (p.row.deleteFlag) {
          return "deleted-cell";
        } else if (
          !!!rows[p.rowIdx] ||
          p.row[column.key] !== rows[p.rowIdx][column.key]
        ) {
          return "editied-cell";
        } else {
          return "original-cell";
        }
      };
      return {
        ...column,
        maxWidth:
          column.visible !== undefined && !column.visible ? 0 : column.maxWidth,
        editor,
        formatter: (p: any) => {
          return column.key === "deleteFlag" ? (
            <div>
              {rowLinkable && rowLink && rowLinkKey && (
                <button
                  onClick={() => {
                    history.push(`${rowLink}${p.row[rowLinkKey]}`);
                  }}
                >
                  근무이력
                </button>
              )}{" "}
              <button
                onClick={() => {
                  setEditTarget({ ...p.row });
                }}
              >
                수정
              </button>{" "}
              <button
                onClick={() => {
                  p.onRowChange({ ...p.row, deleteFlag: true });
                }}
              >
                삭제
              </button>
            </div>
          ) : (
            <div className={getClassName(p)}>{p.row[column.key]}</div>
          );
        },
      };
    });
  };

  return (
    <div id="CommonDataGrid">
      <div className="page-header">{title}</div>
      <DataGrid
        columns={columns}
        rows={editedRows.map((row) => {
          return { ...row, deleteFlag: row.deleteFlag ? true : false };
        })}
        defaultColumnOptions={{
          resizable: true,
        }}
        onRowsChange={(rows: any[], data: any) => {
          setEditedRows(rows);
        }}
        className="common-data-grid"
      />
    </div>
  );
};
