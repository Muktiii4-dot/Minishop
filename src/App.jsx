import { Routes, Route } from "react-router";
import Layout from "./components/layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailProduk from "./pages/DetailProduk";
import Keranjang from "./pages/Keranjang";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Routes>

            <Route element={<Layout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/produk/:id"
                    element={<DetailProduk />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/Keranjang"
                        element={<Keranjang />}
                    />
                </Route>

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Route>

        </Routes>
    );
}

export default App;