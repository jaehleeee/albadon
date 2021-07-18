import { Input, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import "./CommonDataGrid.scss";

export enum ColumnType {
  TEXT = "TEXT",
  DATE = "DATE",
  COMBO = "COMBO",
  NUMBER = "NUMBER",
}

export interface CommonColumnI {
  key: string;
  name: string;
  type: ColumnType;
  comboArray?: { value: string; label: string }[];
  editable?: boolean;
}

export interface CommonDataGridI {
  columns: CommonColumnI[];
  rows: any[];
}

export const DateEditor = (p: any) => (
  <TextField
    autoFocus
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
    value={p.row[p.column.key] || 0}
    onChange={(e) => {
      p.onRowChange({ ...p.row, [p.column.key]: e.target.value });
    }}
  />
);

export const ComboEditor =
  (comboArray?: { value: string; label: string }[]) => (p: any) =>
    (
      <Select
        autoFocus
        value={p.row[p.column.key]}
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
    );

export const CommonDataGrid: React.FC<CommonDataGridI> = ({
  columns,
  rows,
}) => {
  const [editedRows, setEditedRows] = useState<any[]>([]);

  useEffect(() => {
    setEditedRows(rows);
  }, [rows]);

  const getColumns = (columns: CommonColumnI[]) => {
    return columns.map((column) => {
      let editor;
      switch (column.type) {
        case ColumnType.TEXT:
          editor = TextEditor;
          break;
        case ColumnType.NUMBER:
          editor = NumberEditor;
          break;
        case ColumnType.DATE:
          editor = DateEditor;
          break;
        case ColumnType.COMBO:
          editor = ComboEditor(column.comboArray);
          break;
      }

      return {
        ...column,
        editor,
      };
    });
  };

  return (
    <div id="CommonDataGrid">
      <DataGrid
        columns={getColumns(columns)}
        rows={editedRows}
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
