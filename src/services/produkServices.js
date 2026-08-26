const API_URL = "https://fakestoreapi.com/products";

const STOCK_MAP = {
    1: 10,
    2: 5,
    3: 0,
    4: 8,
    5: 0,
    6: 12,
    7: 3,
    8: 10,
    9: 0,
    10: 7,
    11: 5,
    12: 10,
    13: 4,
    14: 0,
    15: 8,
    16: 10,
    17: 6,
    18: 2,
    19: 10,
    20: 5,
};

function normalizeProduct(item) {
    return {
        id: item.id,
        nama: item.title,
        harga: item.price,
        gambar: item.image,
        deskripsi: item.description,
        kategori: item.category,
        stock: STOCK_MAP[item.id] ?? 10,
    };
}

export async function getProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Gagal mengambil data produk");
    }

    const data = await response.json();

    return data.map(normalizeProduct);
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Produk tidak ditemukan");
    }

    const data = await response.json();

    return normalizeProduct(data);
}