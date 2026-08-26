import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProductById } from "../services/produkServices";
import { useLocalStorage } from "../hooks/useLocalStorage";

function DetailProduk() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [produk, setProduk] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [cart, setCart] = useLocalStorage("cart", []);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);

                const data = await getProductById(id);

                setProduk(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    // Menambahkan produk ke keranjang
    function tambahKeKeranjang() {
        if (!produk || produk.stock <= 0) {
            return;
        }

        const produkDiKeranjang = cart.find(
            (item) => item.id === produk.id
        );

        // Kalau produk sudah ada di keranjang
        if (produkDiKeranjang) {
            // Jangan melebihi stok
            if (produkDiKeranjang.quantity >= produk.stock) {
                alert("Jumlah produk sudah mencapai batas stok.");
                return;
            }

            const cartBaru = cart.map((item) =>
                item.id === produk.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            );

            setCart(cartBaru);
        } else {
            // Kalau produk belum ada di keranjang
            const produkBaru = {
                id: produk.id,
                nama: produk.nama,
                harga: produk.harga,
                gambar: produk.gambar,
                stock: produk.stock,
                quantity: 1,
            };

            setCart([...cart, produkBaru]);
        }

        // Setelah berhasil, pergi ke keranjang
        navigate("/Keranjang");
    }

    if (loading) {
        return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <p className="text-center text-slate-500">
                    Memuat detail produk...
                </p>
            </main>
        );
    }

    if (error || !produk) {
        return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <p className="text-center text-red-500">
                    {error || "Produk tidak ditemukan"}
                </p>
            </main>
        );
    }

    const stokHabis = produk.stock <= 0;

    // Ekstrak perhitungan harga ke dalam variabel
    const kurs = 15500;
    const hargaDibulatkan = Math.round(Number(produk.harga) * kurs);
    
    // Perubahan format menjadi Rupiah
    const hargaRupiah = hargaDibulatkan.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    });

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Tombol kembali */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 text-blue-600 hover:text-blue-800 font-medium"
            >
                ← Kembali
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Gambar */}
                <div className="bg-slate-100 rounded-2xl p-8 flex items-center justify-center">
                    <img
                        src={produk.gambar}
                        alt={produk.nama}
                        className="w-full max-w-md h-[450px] object-contain"
                    />
                </div>

                {/* Informasi produk */}
                <div>

                    <p className="text-sm text-blue-600 font-semibold uppercase mb-3">
                        {produk.kategori}
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                        {produk.nama}
                    </h1>

                    {/* 3. Panggil variabel hargaRupiah di sini */}
                    <p className="mt-5 text-2xl font-bold text-blue-600">
                        {hargaRupiah}
                    </p>

                    <p className="mt-6 text-slate-600 leading-relaxed">
                        {produk.deskripsi}
                    </p>

                    {/* Status stok */}
                    <div className="mt-6">
                        {stokHabis ? (
                            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                                Stock Habis
                            </span>
                        ) : (
                            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                                Stok Tersedia ({produk.stock})
                            </span>
                        )}
                    </div>

                    {/* Tombol keranjang */}
                    <button
                        onClick={tambahKeKeranjang}
                        disabled={stokHabis}
                        className={`mt-8 w-full rounded-xl py-4 font-semibold transition ${
                            stokHabis
                                ? "cursor-not-allowed bg-slate-300 text-slate-500"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                        {stokHabis
                            ? "Stock Habis"
                            : "Tambah ke Keranjang"}
                    </button>

                </div>

            </div>
        </main>
    );
}

export default DetailProduk;