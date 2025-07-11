import React, { Suspense } from "react";
import { fetchCategory, fetchMenu } from "@/app/lib/data";
import TableMenu from "@/components/dashboard/menu/TableMenu";

export default async function MenuPage() {
  const [menu, categories] = await Promise.all([
    fetchMenu(),
    fetchCategory()
  ])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Daftar Menu</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <TableMenu menu={menu} categories={categories}/>
        </Suspense>
      </div>
    </div>
  );
}
