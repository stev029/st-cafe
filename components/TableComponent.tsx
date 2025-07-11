"use client";

import React, { useState, useMemo } from "react";
import AddItemForm from "./AddItemForm";

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  template?: React.ReactNode;
  disabled?: boolean;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  searchPlaceholder?: string;
  addButton?: boolean;
  onAddItem?: () => void;
  addButtonLabel?: string;
  onSubmit?: ((newItem: T) => void) | ((newItem: T) => Promise<void>);
  action?: (formData: FormData) => Promise<void> | void
};

export default function TableComponent<T extends { [key: string]: unknown }>(props: TableProps<T>) {
  const {
    columns,
    data,
    pageSize = 10,
    searchPlaceholder = "Cari...",
    addButton = false,
    addButtonLabel = "Tambah Data",
    onSubmit,
    action
  } = props;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<T | null>(null);

  const resolveNestedValue = (row: T, accessor: keyof T): unknown => {
    const keys = String(accessor).split(".");
    return keys.reduce((acc, key) => (acc && (acc as any)[key] ? (acc as any)[key] : undefined), row);
  };

  const handleAddItem = onSubmit || ((newItem: T) => {
    data.push(newItem);
    setShowAddItemForm(false);
    setPage(1);
  });

  const handleEditItem = (item: T, idx: number) => {
    setEditIndex(idx);
    setEditItem(item);
  };

  const handleDeleteItem = (idx: number) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      data.splice(idx, 1);
      setPage(1);
    }
  };

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.accessor]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, columns]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pagedData = useMemo(
    () =>
      filteredData.slice((page - 1) * pageSize, page * pageSize),
    [filteredData, page, pageSize]
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="space-y-4">
      { /* Search and Add Item Controls */}
      <div className="flex items-center justify-between">
        <input
          className="border rounded px-3 py-2 text-sm w-64"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="flex items-center gap-2">
          {addButton && (
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
              onClick={() => setShowAddItemForm(true)}
            >
              {addButtonLabel}
            </button>
          )}
          <span className="text-sm text-gray-500">{filteredData.length} data</span>
        </div>
      </div>
      { /* Table rendering */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-zinc-100">
              {columns.map((col) => (
                <th key={String(col.accessor)} className="py-2 px-4 text-left">
                  {col.header}
                </th>
              ))}
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-4 text-center text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              pagedData.map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  {columns.map((col) => (
                    <td key={String(col.accessor)} className="py-2 px-4">
                      {col.render
                        ? col.render(resolveNestedValue(row, col.accessor) as T[keyof T], row)
                        : resolveNestedValue(row, col.accessor) as React.ReactNode}
                    </td>
                  ))}
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      className="px-2 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500 text-xs"
                      onClick={() => handleEditItem(row, (page - 1) * pageSize + i)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-xs"
                      onClick={() => handleDeleteItem((page - 1) * pageSize + i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      { /* Pagination controls */}
      <div className="flex items-center justify-between mt-2">
        <button
          className="px-3 py-1 rounded bg-zinc-200 text-zinc-700 disabled:opacity-50"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages || 1}
        </span>
        <button
          className="px-3 py-1 rounded bg-zinc-200 text-zinc-700 disabled:opacity-50"
          onClick={handleNext}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
      { /* Add Item Modal */}
      {showAddItemForm && (

        <AddItemForm
          columns={columns}
          onSubmit={onSubmit}
          action={action}
          onClose={() => setShowAddItemForm(false)}
          title="Tambah Item"
        />
      )}
      { /* Edit Item Modal */}
      {editItem && (
        <AddItemForm
          columns={columns}
          data={data[editIndex!]}
          onSubmit={onSubmit}
          action={action}
          onClose={() => {
            setEditIndex(null);
            setEditItem(null);
          }}
          title="Edit Item"
        />
      )}
    </div>
  );
}
