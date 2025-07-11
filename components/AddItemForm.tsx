"use client";

import React, { useState, ReactNode } from "react";

export type FormRenderProps<T> = {
  value: any;
  onChange: (value: unknown) => void;
  formState: Partial<T>;
};

export type Column<T> = {
  header: string;
  accessor: keyof T;
  disabled?: boolean;
  template?: ReactNode;
};

export type AddItemFormProps<T extends { [key: string]: unknown }> = {
  columns: Column<T>[];
  data?: { [key: string]: unknown };
  onSubmit?: (item: T) => void;
  onClose: () => void;
  title?: string;
  action?: (formData: FormData) => Promise<void> | void
};

export default function AddItemForm<T extends { [key: string]: unknown }>({ columns, onSubmit, onClose, data = {}, title, action }: AddItemFormProps<T>) {
  const [formState, setFormState] = useState<Partial<T>>(data as Partial<T>);

  const getNestedValue = (obj: any, path: string): any => {
    if (!path) return undefined;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const handleChange = (key: keyof T, value: unknown) => {
    const path = String(key);
    if (!path.includes('.')) {
      setFormState((prev) => ({ ...prev, [key]: value }));
      return;
    }

    setFormState((prev) => {
      const newState = JSON.parse(JSON.stringify(prev ?? {}));
      const keys = path.split('.');
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] = current[keys[i]] || {};
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formState as T);
    onClose();
  };
  console.log(action)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <form {...(action ? { action: action } : { onSubmit: handleSubmit })} className="space-y-4">
          {columns.map((col) => {
            const value = getNestedValue(formState, String(col.accessor)) ?? "";
            const onChange = (newValue: unknown) => handleChange(col.accessor, newValue);

            return (
              <div key={String(col.accessor)}>
                <label className="block text-sm font-medium mb-1">{col.header}</label>
                {col.template ? 
                  col.template :
                  <input
                    className="border rounded px-3 py-2 w-full text-sm"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={col.disabled}
                    required
                  />
                }
              </div>
            );
          })}
          <div className="flex gap-2 justify-end">
            <button type="button" className="px-4 py-2 rounded bg-zinc-200" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
