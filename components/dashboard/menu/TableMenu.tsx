"use client";

import { createMenu } from "@/app/lib/action";
import TableComponent from "@/components/TableComponent";
import { useState } from "react";

interface MenuTableProps {
    menu: { [key: string]: any }[],
    categories: { [key: string]: any }[],
}

export default function TableMenu({ menu, categories }: MenuTableProps) {
    const [categoryValue, setCategoryValue] = useState<string>("");

    const categoryTamplate = (
        <select className="border rounded px-3 py-2 w-full text-sm" value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)}>
            <option value="" disabled>Pilih Kategori</option>
            {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
        </select>
    )
    return (
        <>
            <TableComponent
                columns={[
                    { header: "Nama Menu", accessor: "name" },
                    { header: "Kategori", accessor: "categories.name", template: categoryTamplate },
                    { header: "Harga", accessor: "price", render: (v) => `Rp ${Number(v).toLocaleString("id-ID")}` },
                    { header: "Stok", accessor: "stock" },
                ]}
                data={menu}
                pageSize={5}
                searchPlaceholder="Cari menu..."
                addButtonLabel="Tambah Menu"
                action={createMenu}
                addButton
            />
        </>
    )
}