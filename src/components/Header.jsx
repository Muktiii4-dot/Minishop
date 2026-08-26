import { Link } from "react-router";
import { useAuth } from "../context/useAuth";

function Header () {
    const { currentUser, isAuthenticated, logout } = useAuth();
    
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                <Link to="/" className="text-2xl font-black tracking-tight text-slate-900">
                    Koperasi<span className="text-blue-600">Kota</span>
                </Link>

                <div className="flex items-center gap-6">

                <Link to="/" className="font-medium text-slate-600 transition hover:text-blue-600">
                    Home
                </Link>

                <Link to="/Keranjang" className="font-medium text-slate-600 transition hover:text-blue-600">
                    Keranjang
                </Link>

                {isAuthenticated ? (
                    <>
                        <span className="text-sm font-medium text-slate-700">
                            Halo, {currentUser.name}
                        </span>

                        <button onClick={logout} className="font-medium text-red-500 hover:text-red-600">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="font-medium text-slate-600 hover:text-blue-600">
                            Login
                        </Link>

                        <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                            Register
                        </Link>
                    </>
                )}

            </div>

            </nav>
        </header>
    );
}

export default Header;