import { useEffect, useState } from "react";
import type { CountryProps } from "./types/country.type";
import type { PortProps } from "./types/port.type";
import type { ItemProps } from "./types/item.type";
import { apiGetCountries } from "./apis/country";
import { apiGetPortByCountry } from "./apis/port";
import { apiGetItemByPort } from "./apis/item";

function App() {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [ports, setPorts] = useState<PortProps[]>([]);
  const [items, setItems] = useState<ItemProps[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [selectedPort, setSelectedPort] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);

  const [discount, setDiscount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    async function fetchCountries() {
      const res = await apiGetCountries();
      setCountries(res || []);
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry !== null) {
      async function fetchPorts() {
        const res = await apiGetPortByCountry(selectedCountry!);
        console.log("ports =>", res);
        setPorts(res || []);
        setSelectedPort(null);
        setItems([]);
      }
      fetchPorts();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedPort !== null) {
      async function fetchItems() {
        const res = await apiGetItemByPort(selectedPort!);
        setItems(res || []);
        setSelectedItem(null);
        setDiscount(0);
        setPrice(0);
      }
      fetchItems();
    }
  }, [selectedPort]);

  const handleItemChange = (itemId: string) => {
    const id = Number(itemId);
    const item = items.find((i) => i.id_barang === id) || null;
    setSelectedItem(item);
    if (item) {
      setDiscount(item.diskon);
      setPrice(item.harga);
    }
  };

  return (
    <div className="font-poppins min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-50 to-pink-200">
      <div className="bg-white mt-20 p-8 rounded-xl shadow-xl w-full max-w-xl space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          🌐 Export Form
        </h2>

        {/* Negara */}
        <div>
          <label className="block text-sm font-semibold mb-1">Negara</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedCountry ?? ""}
            onChange={(e) =>
              setSelectedCountry(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Pilih Negara</option>
            {countries.map((country) => (
              <option key={country.id_negara} value={country.id_negara}>
                {country.nama_negara}
              </option>
            ))}
          </select>
        </div>

        {/* Pelabuhan */}
        <div>
          <label className="block text-sm font-semibold mb-1">Pelabuhan</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedPort ?? ""}
            onChange={(e) =>
              setSelectedPort(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Pilih Pelabuhan</option>
            {ports.map((port) => (
              <option key={port.id_pelabuhan} value={port.id_pelabuhan}>
                {port.nama_pelabuhan}
              </option>
            ))}
          </select>
        </div>

        {/* Barang */}
        <div>
          <label className="block text-sm font-semibold mb-1">Barang</label>
          <select
            className="w-full border rounded px-3 py-2"
            onChange={(e) => handleItemChange(e.target.value)}
          >
            <option value="">Pilih Barang</option>
            {items.map((item) => (
              <option key={item.id_barang} value={item.id_barang}>
                {item.nama_barang}
              </option>
            ))}
          </select>
        </div>

        {/* Deskripsi Barang */}
        <div>
          <label className="block text-sm font-semibold mb-1">Deskripsi</label>
          <input
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
            value={selectedItem?.description || ""}
            readOnly
          />
        </div>

        {/* Discount & Harga */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Discount (%)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Harga</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Total */}
        <div>
          <label className="block text-sm font-semibold mb-1">Total</label>
          <input
            className="w-full border rounded px-3 py-2 bg-gray-50 font-medium"
            value={`Rp. ${((price * (100 - discount)) / 100).toLocaleString(
              "id-ID"
            )}`}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App;
