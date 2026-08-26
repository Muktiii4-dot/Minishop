import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    function validate() {
        const newErrors = {};

        // Validasi nama
        if (!form.name.trim()) {
            newErrors.name = "Nama wajib diisi.";
        }

        // Validasi email
        if (!form.email.trim()) {
            newErrors.email = "Email wajib diisi.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            newErrors.email = "Format email tidak valid.";
        }

        // Validasi password
        if (!form.password) {
            newErrors.password = "Password wajib diisi.";
        } else if (form.password.length < 6) {
            newErrors.password =
                "Password minimal 6 karakter.";
        }

        // Validasi konfirmasi password
        if (!form.confirmPassword) {
            newErrors.confirmPassword =
                "Konfirmasi password wajib diisi.";
        } else if (
            form.password !== form.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Password tidak sama.";
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

        const result = register({
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
        });

        if (!result.success) {
            setServerError(result.message);
            return;
        }

        navigate("/login");
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

                    {/* Judul */}
                    <h1 className="text-3xl font-bold text-slate-900">
                        Register
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Buat akun MiniShop baru.
                    </p>

                    {/* Error dari sistem */}
                    {serverError && (
                        <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {serverError}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-5"
                    >

                        {/* Nama */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Nama
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="Nama lengkap"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="email@example.com"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="Minimal 6 karakter"
                            />

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Konfirmasi password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Konfirmasi Password
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="Ulangi password"
                            />

                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Tombol register */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Register
                        </button>

                    </form>

                    {/* Link ke login */}
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Sudah punya akun?{" "}

                        <Link
                            to="/login"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    );
}

export default Register;