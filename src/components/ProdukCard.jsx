import { Link } from "react-router";

function ProdukCard({ produk }) {
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
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            {/* Badge stok */}
            <div className="absolute left-3 top-3 z-10">
                {stokHabis ? (
                    <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow">
                        Stock Habis
                    </span>
                ) : (
                    <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                        Stok {produk.stock}
                    </span>
                )}
            </div>

            {/* Gambar */}
            <div className="h-96 bg-slate-100 p-4">
                <img
                    src={produk.gambar}
                    alt={produk.nama}
                    className="h-full w-full object-contain"
                />
            </div>

            {/* Informasi */}
            <div className="p-5">

                <h2 className="line-clamp-2 min-h-12 font-semibold text-slate-900">
                    {produk.nama}
                </h2>

                <div className="mt-4 flex items-center justify-between gap-3">

                    <p className="font-bold text-blue-600">
                        {hargaRupiah}
                    </p>

                    <Link
                        to={`/produk/${produk.id}`}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                        Detail
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default ProdukCard;