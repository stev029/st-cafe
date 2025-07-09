export default function AddForm() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Tambah Menu</h1>
      <form className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Menu</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama menu"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Harga (Rp)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan harga menu"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Tambah Menu
        </button>
      </form>
    </div>
  );
}