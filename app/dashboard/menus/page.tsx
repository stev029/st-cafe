"use client";

import React from "react";
import TableComponent from "@/components/TableComponent";
import { menuTable } from "@/app/lib/dummy";

function renderPrice(v: number | string) {
  return `Rp ${Number(v).toLocaleString("id-ID")}`;
}

export default function MenuPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Daftar Menu</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <TableComponent
          columns={[
            { header: "Nama Menu", accessor: "name" },
            { header: "Kategori", accessor: "category" },
            { header: "Harga", accessor: "price", render: renderPrice },
            { header: "Stok", accessor: "stock" },
          ]}
          data={menuTable}
          pageSize={5}
          searchPlaceholder="Cari menu..."
          addButtonLabel="Tambah Menu"
          addButton
        />
      </div>
    </div>
  );
}
