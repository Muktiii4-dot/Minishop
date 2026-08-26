# MiniShop

MiniShop adalah aplikasi toko online sederhana yang dibuat menggunakan **React JS** dan **Vite**. Aplikasi ini menyediakan fitur untuk melihat daftar produk, melihat detail produk, login, mengelola keranjang belanja, serta melakukan pengujian komponen menggunakan Vitest.

---

## Fitur

Beberapa fitur yang tersedia pada MiniShop:

### 1. Halaman Home
- Menampilkan daftar produk.
- Produk ditampilkan dalam bentuk card.
- Menampilkan nama produk.
- Menampilkan harga produk dalam format Rupiah.
- Menampilkan jumlah stok produk.
- Menampilkan status **Stok Habis** jika stok produk sudah habis.
- Tombol **Detail** untuk melihat informasi produk.

### 2. Detail Produk
- Menampilkan informasi lengkap produk.
- Menampilkan gambar produk.
- Menampilkan nama produk.
- Menampilkan harga produk.
- Menampilkan informasi stok.
- Tombol untuk kembali ke halaman sebelumnya.
- Tombol **Tambah ke Keranjang**.

### 3. Keranjang
- Menampilkan produk yang telah ditambahkan.
- Menambah jumlah produk.
- Mengurangi jumlah produk.
- Menghapus produk dari keranjang.
- Menghitung subtotal produk.
- Menghitung total harga keranjang.
- Tombol checkout.
- Tombol kembali.
- Menampilkan pesan ketika keranjang kosong.

### 4. Login
- Form login.
- Input email.
- Input password.
- Validasi login.
- Navigasi setelah login.
- Integrasi dengan sistem autentikasi aplikasi.

### 5. Authentication
Aplikasi memiliki sistem autentikasi menggunakan `AuthContext`.

Fitur authentication meliputi:
- Register.
- Login.
- Logout.
- Mengecek status autentikasi pengguna.
- Menyimpan informasi pengguna yang sedang login.

### 6. Penyimpanan Keranjang
Data keranjang disimpan menggunakan `localStorage`, sehingga data keranjang dapat tetap tersedia ketika halaman direfresh.

### 7. Testing
Aplikasi menggunakan **Vitest** dan **React Testing Library** untuk melakukan pengujian.

Testing mencakup:

- `ProdukCard`
- `Login`
- `Keranjang`

Contoh pengujian:

```bash
npm test