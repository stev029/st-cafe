"use client";

import React, { useState } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  disabled?: boolean;
};

export type AddItemFormProps<T> = {
  columns: Column<T>[];
  data?: { [key: string]: unknown };
  onSubmit: (item: T) => void;
  onClose: () => void;
  title?: string;
  form?: React.ReactNode;
};

export default function AddItemForm<T extends { [key: string]: unknown }>({ columns, onSubmit, onClose, data = {}, title, form }: AddItemFormProps<T>) {
  const [formState, setFormState] = useState<Partial<T>>(data as Partial<T>);

  const handleChange = (key: keyof T, value: unknown) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState as T);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {form || (
          <form onSubmit={handleSubmit} className="space-y-4">
            {columns.map((col) => (
              <div key={String(col.accessor)}>
                <label className="block text-sm font-medium mb-1">{col.header}</label>
                <input
                  className="border rounded px-3 py-2 w-full text-sm"
                  value={formState?.[col?.accessor] !== undefined ? String(formState[col.accessor]) : ""}
                  type="text"
                  placeholder={`Masukkan ${col.header.toLowerCase()}`}
                  onChange={(e) => handleChange(col.accessor, e.target.value)}
                  disabled={col.disabled}
                  required
                />
              </div>
            ))}
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 rounded bg-zinc-200" onClick={onClose}>
                Batal
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Simpan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
