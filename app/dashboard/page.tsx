"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import TableComponent from "@/components/TableComponent";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy data, ganti dengan fetch data dari database jika sudah ada model Order & Menu
const todayOrders = 23;
const yesterdayOrders = 18;
const todayRevenue = 1250000; // dalam rupiah
const yesterdayRevenue = 950000;
const menuStock = [
	{ name: "Kopi Susu", stock: 12 },
	{ name: "Teh Manis", stock: 5 },
	{ name: "Roti Bakar", stock: 0 },
];

const orderChartData = {
	labels: ["Kemarin", "Hari Ini"],
	datasets: [
		{
			label: "Total Pesanan",
			data: [yesterdayOrders, todayOrders],
			backgroundColor: "#6366f1",
		},
	],
};

const revenueChartData = {
	labels: ["Kemarin", "Hari Ini"],
	datasets: [
		{
			label: "Pendapatan (Rp)",
			data: [yesterdayRevenue, todayRevenue],
			backgroundColor: "#22d3ee",
		},
	],
};

const chartOptions = {
	responsive: true,
	plugins: {
		legend: { position: "top" as const },
		title: { display: true, text: "Perbandingan Hari Ini & Kemarin" },
	},
};

// Dummy data untuk tabel stok barang
const stockTable = [
	{ name: "Kopi Susu", stock: 12, satuan: "gelas" },
	{ name: "Teh Manis", stock: 5, satuan: "gelas" },
	{ name: "Roti Bakar", stock: 0, satuan: "potong" },
	{ name: "Es Coklat", stock: 7, satuan: "gelas" },
];

// Dummy data untuk transaksi terakhir
const lastTransactions = [
	{
		id: "TRX001",
		menu: "Kopi Susu",
		qty: 2,
		total: 24000,
		date: "2025-07-09 10:12",
	},
	{
		id: "TRX002",
		menu: "Roti Bakar",
		qty: 1,
		total: 15000,
		date: "2025-07-09 10:15",
	},
	{
		id: "TRX003",
		menu: "Teh Manis",
		qty: 3,
		total: 21000,
		date: "2025-07-09 10:20",
	},
	{
		id: "TRX004",
		menu: "Es Coklat",
		qty: 1,
		total: 13000,
		date: "2025-07-09 10:25",
	},
];

export default function DashboardPage(): React.ReactNode {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold mb-2">Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white rounded-lg shadow p-6">
					<h2 className="font-semibold text-lg mb-4">Total Pesanan</h2>
					<Bar data={orderChartData} options={chartOptions} />
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<h2 className="font-semibold text-lg mb-4">Pendapatan Harian</h2>
					<Bar data={revenueChartData} options={chartOptions} />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-gray-500">Total Pesanan Hari Ini</div>
					<div className="text-2xl font-bold">{todayOrders}</div>
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-gray-500">Pendapatan Harian</div>
					<div className="text-2xl font-bold">
						Rp {todayRevenue.toLocaleString("id-ID")}
					</div>
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<div className="text-gray-500 mb-2">Status Stok Menu</div>
					<ul className="space-y-1">
						{menuStock.map((item) => (
							<li
								key={item.name}
								className={item.stock === 0 ? "text-red-500" : ""}
							>
								{item.name}:{" "}
								<span className="font-semibold">{item.stock}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
					<h2 className="font-semibold text-lg mb-4">Tabel Stok Barang</h2>
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
				<div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
					<h2 className="font-semibold text-lg mb-4">Transaksi Terakhir</h2>
					<TableComponent
						columns={[
							{ header: "ID", accessor: "id" },
							{ header: "Menu", accessor: "menu" },
							{ header: "Qty", accessor: "qty" },
							{
								header: "Total",
								accessor: "total",
								render: (v) => `Rp ${v.toLocaleString("id-ID")}`,
							},
							{ header: "Waktu", accessor: "date" },
						]}
						data={lastTransactions}
						pageSize={5}
						searchPlaceholder="Cari transaksi..."
					/>
				</div>
			</div>
		</div>
	);
}