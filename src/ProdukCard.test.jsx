import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect } from "vitest";

import ProdukCard from "./components/ProdukCard";

describe("ProdukCard Component", () => {
    const produk = {
        id: 1,
        nama: "Mechanical Keyboard",
        harga: 450000,
        stock: 10,
        gambar: "",
    };

    it("menampilkan nama produk dengan benar", () => {
        render(
            <MemoryRouter>
                <ProdukCard produk={produk} />
            </MemoryRouter>
        );

        expect(
            screen.getByText("Mechanical Keyboard")
        ).toBeInTheDocument();
    });

    it("menampilkan tombol Detail dengan benar", () => {
        render(
            <MemoryRouter>
                <ProdukCard produk={produk} />
            </MemoryRouter>
        );

        const tombolDetail = screen.getByRole("link", {
            name: /detail/i,
        });

        expect(tombolDetail).toBeInTheDocument();
        expect(tombolDetail).toHaveAttribute(
            "href",
            "/produk/1"
        );
    });
});