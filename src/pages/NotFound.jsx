import { Link } from "react-router";

function NotFound() {
    return (
        <section className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="text-center">

                <h1 className="text-7xl font-black text-slate-900">404</h1>

                <p className="mt-4 text-xl text-slate-500">Halaman Tidak Ditemukan</p>

                <Link to="/" className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">
                    kembali ke Home
                </Link>

            </div>
        </section>
    );
}

export default NotFound;