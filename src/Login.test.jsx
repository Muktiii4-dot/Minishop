import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect } from "vitest";

import Login from "./pages/Login";
import AuthProvider from "./context/AuthContext";

function renderLogin() {
    return render(
        <MemoryRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </MemoryRouter>
    );
}

describe("Login Page", () => {
    it("menampilkan input email dan password", () => {
        renderLogin();

        expect(
            screen.getByLabelText(/email/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/password/i)
        ).toBeInTheDocument();
    });

    it("menampilkan tombol Login", () => {
        renderLogin();

        expect(
            screen.getByRole("button", {
                name: /login/i,
            })
        ).toBeInTheDocument();
    });
});