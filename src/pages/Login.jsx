import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    function validate() {
        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email wajib diisi.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            newErrors.email = "Format email tidak valid.";
        }

        if (!form.password) {
            newErrors.password = "Password wajib diisi.";
        }

        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();

        setServerError("");

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const result = login(
            form.email.trim(),
            form.password
        );

        if (!result.success) {
            setServerError(result.message);
            return;
        }

        const destination =
            location.state?.from?.pathname || "/";

        navigate(destination, { replace: true });
    }

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Login
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Masuk ke akun MiniShop kamu.
                    </p>

                    {serverError && (
                        <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {serverError}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-5"
                    >

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="email@example.com"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="Masukkan password"
                            />

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Login
                        </button>

                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Belum punya akun?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Register
                        </Link>
                    </p>

                </div>

            </div>
        </main>
    );
}

export default Login;