"use client";

import React from "react";
import TableComponent from "@/components/TableComponent";

// Dummy data stok barang
const stockTable = [
  { name: "Kopi Susu", stock: 12, satuan: "gelas" },
  { name: "Teh Manis", stock: 5, satuan: "gelas" },
  { name: "Roti Bakar", stock: 0, satuan: "potong" },
  { name: "Es Coklat", stock: 7, satuan: "gelas" },
];

export default function BarangPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Stok Barang</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <TableComponent
          columns={[
            { header: "Nama Barang", accessor: "name" },
            { header: "Stok", accessor: "stock" },
            { header: "Satuan", accessor: "satuan" },
          ]}
          data={stockTable}
          pageSize={5}
          searchPlaceholder="Cari barang..."
        />
      </div>
    </div>
  );
}
