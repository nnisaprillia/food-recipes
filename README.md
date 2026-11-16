# Aplikasi Resep Masakan (React Native + Expo)

Aplikasi resep sederhana terinspirasi Cookpad. Data diambil dari
[DummyJSON Recipes API](https://dummyjson.com/docs/recipes) dan dikelola dengan
TanStack Query sebagai server state.

## Fitur

- Daftar resep: nama, gambar, kategori (cuisine + meal type), dan waktu memasak.
- Pencarian berdasarkan nama melalui endpoint `/recipes/search` dengan debounce.
- Pencarian berdasarkan bahan dengan memfilter `ingredients` di sisi klien
  (API tidak menyediakan endpoint pencarian bahan).
- Detail resep: gambar, daftar bahan, dan langkah memasak bernomor.
- Loading state, error handling dengan retry dan tombol **Coba Lagi**, empty
  state, banner saat refresh gagal namun cache masih tersedia.
- Caching TanStack Query, pull-to-refresh, dan refetch otomatis saat koneksi
  kembali online (NetInfo + `onlineManager`).

## Menjalankan

```bash
npm install
npx expo start
```

Buka lewat Expo Go (scan QR) atau emulator Android. Untuk memeriksa tipe dan
lint:

```bash
npx tsc --noEmit
npx expo lint
```

## Struktur folder

```
src/
├─ app/                        # Layar (Expo Router, berbasis file)
│  ├─ _layout.tsx              # Provider TanStack Query + Stack navigator
│  ├─ index.tsx                # Layar daftar + pencarian
│  └─ recipe/
│     └─ [id].tsx              # Layar detail resep
├─ api/
│  └─ recipes.ts               # Fungsi pemanggil REST API
├─ hooks/
│  ├─ useRecipes.ts            # Hook TanStack Query (list, search, detail)
│  └─ useDebounce.ts           # Menunda pencarian saat mengetik
├─ components/
│  ├─ RecipeCard.tsx           # Kartu resep di daftar
│  ├─ SearchBar.tsx            # Input + toggle mode (Nama / Bahan)
│  └─ StateViews.tsx           # LoadingView, ErrorView, EmptyView
├─ constants/
│  └─ theme.ts                 # Warna, spacing, radius
└─ types/
   └─ recipe.ts                # Tipe TypeScript
```

Prinsipnya: layar hanya menyusun tampilan, `hooks` mengurus data/state, `api`
hanya berbicara dengan server, `components` dapat dipakai ulang, dan
`types`/`constants` dipusatkan.

## Keputusan desain

- **Kategori** memakai `cuisine` dan `mealType` karena API tidak memiliki field
  `category`.
- **Pencarian bahan** memfilter array `ingredients` dari cache `["recipes"]`,
  sehingga tidak ada request tambahan.
- **Debounce 400 ms** agar request pencarian tidak dikirim di setiap ketukan.
- **`placeholderData: keepPreviousData`** menjaga hasil pencarian lama tetap
  tampil selama hasil baru dimuat.
- **Caching**: `staleTime` 5 menit, `gcTime` 30 menit, `retry` 2 kali. Detail
  disimpan per `id`, pencarian per kata kunci.
- **Offline awareness**: `onlineManager` dihubungkan ke NetInfo agar query
  otomatis refetch saat koneksi pulih.

## Pengujian

Skenario uji mengikuti bagian 9 panduan. Screenshot tersimpan di
`testing/screenshots/` (diambil melalui Expo web pada viewport 390×844).

| #   | Skenario                | Bukti                                      |
| --- | ----------------------- | ------------------------------------------ |
| 1   | Muat daftar             | `01-list.png`                              |
| 2   | Cari nama `pizza`       | `02-search-name.png`                       |
| 3   | Cari nama tanpa hasil   | `03-search-empty.png`                      |
| 4   | Cari bahan `garlic`     | `04-search-ingredient.png`                 |
| 5   | Buka detail             | `05-detail.png`                            |
| 6   | Caching daftar          | `06-list-from-cache.png` (tanpa spinner)   |
| 7   | Caching detail          | `07-detail-from-cache.png` (tampil instan) |
| 8   | Pull-to-refresh         | Perlu diuji dengan gestur di perangkat     |
| 9   | Error tanpa data        | `09-error-no-data.png`                     |
| 10  | Pulih dari error        | `10-recovered.png`                         |
| 11  | Error dengan cache      | `11-error-with-cache.png`                  |
| 12  | Detail id tidak ada     | `12-detail-404.png`                        |
| 13  | Koneksi lambat          | `13-slow-loading.png`                      |

Verifikasi tambahan: `npx tsc --noEmit` dan `npx expo lint` bersih, serta
`npx expo export --platform web` berhasil.
