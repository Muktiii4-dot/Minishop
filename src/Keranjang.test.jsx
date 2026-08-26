import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, beforeEach } from "vitest";

import Keranjang from "./pages/Keranjang";

describe("Halaman Keranjang", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("menampilkan halaman keranjang dengan benar ketika kosong", () => {
        render(
            <MemoryRouter>
                <Keranjang />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("heading", {
                name: "Keranjang",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByText("Keranjang masih kosong.")
        ).toBeInTheDocument();

        expect(
            screen.getByRole("link", {
                name: /mulai belanja/i,
            })
        ).toBeInTheDocument();
    });
});