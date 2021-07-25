import { Button, Input, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import { Link, useHistory } from "react-router-dom";
import "./CommonDataGrid.scss";
import { CommonDataModal } from "./CommonDataModal";

export enum ColumnType {
  TEXT = "TEXT",
  DATE = "DATE",
  COMBO = "COMBO",
  NUMBER = "NUMBER",
  PHONE = "PHONE",
}

export interface CommonColumnI {
  key: string;
  name: string;
  type?: ColumnType;
  width?: number;
  minWidth?: number;
  comboArray?: { value: string; label: string }[];
  editable?: boolean;
}

export interface CommonDataGridI {
  columns: CommonColumnI[];
  rows: any[];
  title: string;
  insertable?: boolean;
  deleteable?: boolean;
  rowLinkable?: boolean;
  rowLink?: string;
  rowLinkKey?: string;
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

export const ComboEditor =
  (comboArray?: { value: string; label: string }[]) => (p: any) =>
    comboArray ? (
      <Select
        autoFocus
        value={p.row[p.column.key] || ""}
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

export const CommonDataGrid: React.FC<CommonDataGridI> = ({
  columns,
  rows,
  title,
  insertable = true,
  deleteable = true,
  rowLinkable = false,
  rowLink = "",
  rowLinkKey = "",
}) => {
  const [editedRows, setEditedRows] = useState<any[]>([]);
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
        editor,
        formatter: (p: any) => {
          return column.key === "deleteFlag" ? (
            <div>
              {deleteable &&
                (p.row.deleteFlag ? (
                  <button
                    onClick={() => {
                      p.onRowChange({ ...p.row, deleteFlag: false });
                    }}
                  >
                    삭제취소
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      p.onRowChange({ ...p.row, deleteFlag: true });
                    }}
                  >
                    삭제
                  </button>
                ))}
              {rowLinkable && rowLink && rowLinkKey && (
                <button
                  onClick={() => {
                    history.push(`${rowLink}${p.row[rowLinkKey]}`);
                  }}
                >
                  상세
                </button>
              )}
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
      <div className="page-header">
        <h1>{title}</h1>
        {insertable && (
          <CommonDataModal
            label="신규등록"
            onSave={(newDataRow: any) => {
              setEditedRows([...editedRows, newDataRow]);
            }}
            colDef={columns}
          />
        )}
        <Button className="save-btn">저장 😀</Button>
      </div>
      <DataGrid
        columns={getColumns([
          {
            key: "deleteFlag",
            name: "",
            minWidth: 40,
          },
          ...columns,
        ])}
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
