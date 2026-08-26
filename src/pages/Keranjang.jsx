import { useNavigate, Link } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Keranjang() {
    const navigate = useNavigate();
    const [cart, setCart] = useLocalStorage("cart", []);

    // PERUBAHA FUNGSI FORMAT RUPIAH
    const formatKeRupiah = (hargaDolar) => {
        const kurs = 15500;
        const totalRupiah = Math.round(Number(hargaDolar) * kurs);
        return totalRupiah.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
    };

    // FUNGSI HAPUS ITEM
    function hapusItem(id) {
        const newCart = cart.filter((item) => item.id !== id);
        setCart(newCart);
    }

    // FUNGSI TAMBAH JUMLAH
    function tambahJumlah(id) {
        const itemTerkait = cart.find((item) => item.id === id);

        if (itemTerkait && itemTerkait.quantity >= itemTerkait.stock) {
            alert(`Maksimal pembelian untuk ${itemTerkait.nama} adalah ${itemTerkait.stock} barang.`);
            return;
        }

        const newCart = cart.map((item) =>
            item.id === id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                }
                : item
        );
        setCart(newCart);
    }

    function kurangJumlah(id) {
        const newCart = cart
            .map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                    : item
            )
            .filter((item) => item.quantity > 0);
        setCart(newCart);
    }

    const subtotalBelanja = cart.reduce(
        (total, item) => total + item.harga * item.quantity,
        0
    );

    return (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-10">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 inline-flex items-center gap-2 font-medium text-slate-600 transition hover:text-blue-600"
                >
                    ← Kembali
                </button>
                <h1 className="text-3xl font-bold text-slate-900">Keranjang</h1>
            </div>

            {cart.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                    <p className="text-slate-500">Keranjang masih kosong.</p>
                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                    >
                        Mulai Belanja
                    </Link>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                        {cart.map((item) => {
                            const subtotalProduk = item.harga * item.quantity;
                            
                            // Cek apakah item ini sudah mentok batas stoknya
                            const stokMaksimal = item.quantity >= item.stock;

                            return (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                                >
                                    <img
                                        src={item.gambar}
                                        alt={item.nama}
                                        className="h-28 w-28 rounded-xl object-cover"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-lg font-bold text-slate-900">
                                            {item.nama}
                                        </h2>
                                        
                                        <p className="mt-2 text-blue-600">
                                            {formatKeRupiah(item.harga)}
                                        </p>
                                        
                                        {/* Info Sisa Stok */}
                                        <p className="mt-1 text-xs text-slate-500">
                                            Sisa stok: {item.stock}
                                        </p>

                                        <div className="mt-3 flex items-center gap-3">
                                            <button
                                                onClick={() => kurangJumlah(item.id)}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-lg font-bold transition hover:bg-slate-100"
                                            >
                                                −
                                            </button>
                                            
                                            <span className="w-8 text-center font-semibold">
                                                {item.quantity}
                                            </span>
                                            
                                            {/* Tombol Plus yang sudah disesuaikan UX-nya */}
                                            <button
                                                onClick={() => tambahJumlah(item.id)}
                                                disabled={stokMaksimal}
                                                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-lg font-bold transition ${
                                                    stokMaksimal
                                                        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300"
                                                        : "border-slate-300 hover:bg-slate-100 text-slate-900"
                                                }`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
                                        <div className="text-left sm:text-right">
                                            <p className="text-sm text-slate-500">
                                                Subtotal
                                            </p>
                                            <p className="mt-1 text-lg font-bold text-slate-900">
                                                {formatKeRupiah(subtotalProduk)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => hapusItem(item.id)}
                                            className="text-sm font-medium text-red-500 transition hover:text-red-600"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">
                            Ringkasan Belanja
                        </h2>
                        <div className="my-6 border-t border-slate-200" />
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Subtotal</span>
                            <span className="font-bold text-slate-900">
                                {formatKeRupiah(subtotalBelanja)}
                            </span>
                        </div>
                        <div className="my-6 border-t border-slate-200" />
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-slate-900">
                                Total
                            </span>
                            <span className="text-xl font-bold text-blue-600">
                                {formatKeRupiah(subtotalBelanja)}
                            </span>
                        </div>
                        <button
                            onClick={() => alert("Checkout belum tersedia.")}
                            className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Keranjang;