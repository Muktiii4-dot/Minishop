import { useEffect, useMemo, useState } from "react";
import ProdukCard from "../components/ProdukCard";
import { getProducts } from "../services/produkServices";

function Home() {
    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Search
    const [kataKunci, setKataKunci] = useState("");

    // Filter kategori
    const [kategori, setKategori] = useState("semua");

    // Filter stok
    const [statusStok, setStatusStok] = useState("semua");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProduk(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // Ambil daftar kategori unik
    const daftarKategori = useMemo(() => {
        return [...new Set(produk.map((p) => p.kategori))];
    }, [produk]);

    // Search + filter
    const produkTersaring = useMemo(() => {
        return produk.filter((p) => {

            // Search
            const cocokDenganSearch = p.nama
                .toLowerCase()
                .includes(kataKunci.toLowerCase());

            // Filter kategori
            const cocokDenganKategori =
                kategori === "semua" ||
                p.kategori === kategori;

            // Filter stok
            const cocokDenganStok =
                statusStok === "semua" ||
                (statusStok === "tersedia" && p.stock > 0) ||
                (statusStok === "habis" && p.stock <= 0);

            return (
                cocokDenganSearch &&
                cocokDenganKategori &&
                cocokDenganStok
            );
        });
    }, [produk, kataKunci, kategori, statusStok]);

    if (loading) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-10">
                <p className="text-center text-slate-500">
                    Memuat produk...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-10">
                <p className="text-center text-red-500">
                    {error}
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Produk
                </h1>

                <p className="mt-2 text-slate-500">
                    Temukan produk yang kamu cari
                </p>
            </div>

            {/* Search & Filter */}
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Search */}
                <div className="md:col-span-1">
                    <label
                        htmlFor="search"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Cari Produk
                    </label>

                    <input
                        id="search"
                        type="text"
                        value={kataKunci}
                        onChange={(e) => setKataKunci(e.target.value)}
                        placeholder="Cari produk..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Kategori */}
                <div>
                    <label
                        htmlFor="kategori"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Kategori
                    </label>

                    <select
                        id="kategori"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="semua">
                            Semua Kategori
                        </option>

                        {daftarKategori.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stok */}
                <div>
                    <label
                        htmlFor="stok"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Status Stok
                    </label>

                    <select
                        id="stok"
                        value={statusStok}
                        onChange={(e) => setStatusStok(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="semua">
                            Semua Produk
                        </option>

                        <option value="tersedia">
                            Stok Tersedia
                        </option>

                        <option value="habis">
                            Stock Habis
                        </option>
                    </select>
                </div>
            </div>

            {/* Jumlah hasil */}
            <div className="mb-5">
                <p className="text-sm text-slate-500">
                    Menampilkan{" "}
                    <span className="font-semibold text-slate-900">
                        {produkTersaring.length}
                    </span>{" "}
                    produk
                </p>
            </div>

            {/* Produk */}
            {produkTersaring.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {produkTersaring.map((p) => (
                        <ProdukCard
                            key={p.id}
                            produk={p}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
                    <p className="text-lg font-semibold text-slate-700">
                        Produk tidak ditemukan
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        Coba gunakan kata kunci atau filter lainnya.
                    </p>
                </div>
            )}

        </main>
    );
}

export default Home;