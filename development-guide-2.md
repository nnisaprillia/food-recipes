# Development Guide 2 — Soal 2: Aplikasi Resep Masakan (React Native + Expo + TanStack Query)

> **Mata kuliah:** Pemrograman Mobile Lanjut (412573401) · **Bobot:** 35% · **CPMK 2** · **Model:** Case Based Learning
> **Stack:** Expo (TypeScript) · Expo Router · TanStack Query v5 · DummyJSON Recipes API
> **Target waktu (saran):** ±45 menit dari 120 menit ujian (Soal 1 ±20 menit, Soal 3 ±50 menit).

> ⚠️ Kode di panduan ini disusun berdasarkan struktur respons API yang sudah dicek dan dokumentasi library, tetapi **belum dijalankan** di perangkat. Jalankan, lalu sesuaikan bila ada versi paket yang berbeda (lihat bagian Troubleshooting).

---

## 0. Progress Tracker (WAJIB DIUPDATE OLEH AI YANG MENGERJAKAN)

**Aturan untuk AI:**

- Centang `[x]` HANYA setelah item benar-benar selesai **dan sudah diverifikasi** (kode ada, tidak error, dan bisa dijalankan).
- Setelah menyelesaikan satu fase, perbarui bagian **Status Ringkas** dan tambahkan baris di **Log Pekerjaan**.
- Jika ada item yang gagal atau dilewati, jangan dicentang. Tulis alasannya di kolom **Catatan / Kendala**.
- Kerjakan berurutan dari Fase 1 ke Fase 7. Jangan lompat kecuali fase sebelumnya sudah dicentang.

### Status Ringkas

| Fase | Nama                         | Status   |
| ---- | ---------------------------- | -------- |
| 1    | Setup proyek                 | ✅ Selesai |
| 2    | Tipe, API, dan hooks         | ✅ Selesai |
| 3    | Tema dan komponen            | ✅ Selesai |
| 4    | Layar dan navigasi           | ✅ Selesai |
| 5    | Verifikasi fitur sesuai soal | ✅ Selesai |
| 6    | Pengujian                    | ✅ Selesai |
| 7    | Dokumentasi dan pengumpulan  | ✅ Selesai |

Legenda status: ⬜ Belum · 🟡 Sedang dikerjakan · ✅ Selesai · ❌ Terkendala

### Fase 1 — Setup proyek

- [x] Proyek dibuat dengan `npx create-expo-app@latest recipe-app`
- [x] `npm run reset-project` dijalankan, kode contoh bawaan sudah dibersihkan
- [x] `@tanstack/react-query` terpasang
- [x] `expo-image` dan `@react-native-community/netinfo` terpasang via `npx expo install`
- [x] `npx expo start` berjalan tanpa error (layar kosong/awal tampil)
- [x] Folder dibuat: `api/`, `hooks/`, `components/`, `constants/`, `types/`, `app/recipe/` (di dalam `src/` sesuai alias template)

### Fase 2 — Tipe, API, dan hooks

- [x] `types/recipe.ts` (`Recipe`, `RecipesResponse`)
- [x] `api/recipes.ts` (`getRecipes` dengan `?limit=100`, `searchRecipes`, `getRecipeById`, cek `res.ok`)
- [x] `hooks/useRecipes.ts` (`useRecipes`, `useSearchRecipes`, `useRecipe`) dengan `staleTime`, `enabled`, `placeholderData`
- [x] `hooks/useDebounce.ts`
- [x] `npx tsc --noEmit` tidak menampilkan error tipe

### Fase 3 — Tema dan komponen

- [x] `constants/theme.ts` (colors, spacing, radius)
- [x] `components/StateViews.tsx` (`LoadingView`, `ErrorView`, `EmptyView`)
- [x] `components/SearchBar.tsx` (input + toggle mode Nama/Bahan)
- [x] `components/RecipeCard.tsx` (nama, gambar, kategori, waktu memasak)

### Fase 4 — Layar dan navigasi

- [x] `app/_layout.tsx` (`QueryClientProvider`, `Stack`, `onlineManager` + NetInfo)
- [x] `app/index.tsx` (daftar resep, pencarian, pull-to-refresh)
- [x] `app/recipe/[id].tsx` (detail: gambar, bahan, langkah)
- [x] Navigasi daftar → detail → kembali berfungsi
- [x] Aplikasi berjalan di Expo Go / emulator tanpa crash (diverifikasi via Expo web + Chrome karena Expo Go/emulator tidak tersedia)

### Fase 5 — Verifikasi fitur sesuai soal (cocokkan dengan 7 instruksi di soal)

- [x] 1. Data diambil dari REST API (DummyJSON)
- [x] 2. Daftar menampilkan nama, gambar, kategori, dan waktu memasak
- [x] 3. Pencarian berdasarkan nama berfungsi
- [x] 4. Detail menampilkan gambar, daftar bahan, dan langkah memasak
- [x] 5. Pencarian berdasarkan bahan berfungsi (filter di klien)
- [x] 6. Loading, error handling, dan caching memakai TanStack Query
- [x] 7. Struktur komponen dan folder rapi (sesuai bagian 3 panduan)

### Fase 6 — Pengujian (lihat tabel skenario di bagian 9)

- [x] #1 Muat daftar
- [x] #2 Cari nama
- [x] #3 Cari nama tanpa hasil
- [x] #4 Cari bahan
- [x] #5 Buka detail
- [x] #6 Caching daftar (kembali tanpa spinner)
- [x] #7 Caching detail
- [ ] #8 Pull-to-refresh (kode ada; belum diuji gestur karena tidak ada perangkat/emulator)
- [x] #9 Error saat belum ada data (tombol Coba Lagi)
- [x] #10 Pulih dari error
- [x] #11 Error saat sudah ada cache (banner)
- [x] #12 Error detail (id tidak ada)
- [x] #13 Koneksi lambat
- [x] Screenshot/rekaman hasil uji sudah disimpan (`testing/screenshots/`)

### Fase 7 — Dokumentasi dan pengumpulan

- [x] `README.md` (fitur, cara menjalankan, struktur folder, keputusan desain)
- [x] Tidak ada `console.log` sisa atau kode contoh yang tidak terpakai
- [x] `npx tsc --noEmit` bersih

### Log Pekerjaan

| Fase | Tanggal    | Hasil                                                                 | Catatan / Kendala |
| ---- | ---------- | --------------------------------------------------------------------- | ----------------- |
| 1    | 2026-11-14 | Struktur folder dibuat di bawah `src/` (sesuai alias `@/`)             | Template Expo SDK 58 memakai `src/app`, bukan root `app/` |
| 2    | 2026-11-14 | Tipe, API, hooks, dan debounce selesai                                | `npx tsc --noEmit` bersih |
| 3    | 2026-11-14 | Tema, StateViews, SearchBar, dan RecipeCard selesai                   | — |
| 4    | 2026-11-14 | Layout, daftar, detail, dan navigasi berfungsi                        | Diverifikasi via Expo web + Chrome; Expo Go/emulator tidak tersedia di lingkungan ini |
| 5    | 2026-11-14 | 7 instruksi soal terverifikasi                                        | API live: 50 resep, search `pizza`, 20 resep mengandung `garlic`, detail & 404 sesuai |
| 6    | 2026-11-14 | 12 skenario diuji, screenshot disimpan di `testing/screenshots/`      | #8 pull-to-refresh belum diuji gestur di perangkat/emulator |
| 7    | 2026-11-14 | README diperbarui, kode contoh dihapus, tsc + lint bersih             | — |

## 1. Ringkasan target dan pemetaan ke rubrik

| #   | Kebutuhan soal                                         | Cara memenuhi                                                                              | Rubrik                                   |
| --- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------- |
| 1   | Ambil data dari REST API                               | `fetch` ke DummyJSON di `api/recipes.ts`                                                   | Integrasi API (25%)                      |
| 2   | Daftar resep: nama, gambar, kategori, waktu masak      | `RecipeCard`: `name`, `image`, `cuisine` + `mealType`, `prepTimeMinutes + cookTimeMinutes` | Integrasi API (25%)                      |
| 3   | Cari resep berdasarkan **nama**                        | Endpoint `/recipes/search?q=` + debounce                                                   | Pencarian dan detail (25%)               |
| 4   | Detail resep: gambar, bahan, langkah                   | Layar `recipe/[id].tsx` + endpoint `/recipes/{id}`                                         | Pencarian dan detail (25%)               |
| 5   | Cari resep berdasarkan **bahan** (jika API mendukung)  | API tidak punya pencarian bahan → **filter di sisi klien** pada array `ingredients`        | Pencarian dan detail (25%)               |
| 6   | Loading, error handling, caching dengan TanStack Query | `useQuery`, `isPending`, `isError`, `staleTime`, `gcTime`, `retry`, `refetch`              | Server State (20%) + Loading/Error (15%) |
| 7   | Struktur komponen dan folder terorganisasi             | Struktur di bagian 3                                                                       | Struktur proyek (15%)                    |
| –   | Pengujian aplikasi                                     | Skenario uji di bagian 9 (+ screenshot)                                                    | Loading/Error/pengujian (15%)            |

### Endpoint yang dipakai (semua `GET`)

| Fungsi                | URL                                            | Catatan                                                                              |
| --------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| Daftar resep          | `https://dummyjson.com/recipes?limit=100`      | Default hanya mengembalikan 30 dari 50 resep, jadi pakai `limit` agar semua terambil |
| Cari berdasarkan nama | `https://dummyjson.com/recipes/search?q=pizza` | Parameter `q`                                                                        |
| Detail resep          | `https://dummyjson.com/recipes/1`              | Berdasarkan `id`                                                                     |

**Bentuk data satu resep** (hasil cek respons asli):

```json
{
  "id": 1,
  "name": "Classic Margherita Pizza",
  "ingredients": ["Pizza dough", "Tomato sauce", "..."],
  "instructions": ["Preheat the oven to 475°F (245°C).", "..."],
  "prepTimeMinutes": 20,
  "cookTimeMinutes": 15,
  "servings": 4,
  "difficulty": "Easy",
  "cuisine": "Italian",
  "caloriesPerServing": 300,
  "tags": ["Pizza", "Italian"],
  "userId": 166,
  "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
  "rating": 4.6,
  "reviewCount": 98,
  "mealType": ["Dinner"]
}
```

Respons daftar dan pencarian dibungkus: `{ "recipes": [...], "total": 50, "skip": 0, "limit": 30 }`. Detail berupa satu objek resep.

**Soal "kategori"**: API tidak punya field `category`. Pakai `cuisine` (mis. Italian, Asian) dan/atau `mealType` (mis. Dinner, Dessert) sebagai kategori; tulis keputusan ini di README.

---

## 2. Persiapan proyek (Expo)

```bash
# 1. Buat proyek (template default sudah TypeScript + Expo Router)
npx create-expo-app@latest recipe-app
cd recipe-app

# 2. Bersihkan kode contoh bawaan template
npm run reset-project        # bila ditanya memindahkan/menghapus file contoh, pilih sesuai selera

# 3. Pasang dependensi
npm install @tanstack/react-query
npx expo install expo-image @react-native-community/netinfo

# 4. Jalankan
npx expo start
```

- Buka lewat **Expo Go** di HP (scan QR) atau **Android emulator**. Di Windows, iOS simulator tidak tersedia, jadi pakai Expo Go atau emulator Android.
- HP dan laptop harus satu jaringan Wi-Fi. Jika gagal tersambung, jalankan `npx expo start --tunnel`.
- `expo-image` dipakai agar gambar punya cache bawaan dan transisi halus. `NetInfo` dipakai agar TanStack Query tahu status online/offline.

---

## 3. Struktur folder

Alias `@/` pada template default mengarah ke root proyek, jadi impor bisa ditulis `@/api/recipes`.

```
recipe-app/
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
├─ types/
│  └─ recipe.ts                # Tipe TypeScript
└─ README.md                   # Cara menjalankan + keputusan desain
```

Prinsip yang bisa kamu tulis di README (nilai "terorganisasi"): **layar** hanya menyusun tampilan, **hooks** mengurus data/state, **api** hanya bicara dengan server, **components** dapat dipakai ulang, dan **types/constants** dipusatkan.

---

## 4. Langkah pengerjaan (urut)

### Langkah 1 — Tipe data: `types/recipe.ts`

```ts
export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}
```

### Langkah 2 — Lapisan API: `api/recipes.ts`

```ts
import type { Recipe, RecipesResponse } from "@/types/recipe";

const BASE_URL = "https://dummyjson.com/recipes";

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  // fetch TIDAK melempar error untuk status 4xx/5xx, jadi cek manual supaya TanStack Query tahu ini error
  if (!res.ok) throw new Error(`Permintaan gagal (HTTP ${res.status})`);
  return res.json() as Promise<T>;
}

export const getRecipes = () =>
  request<RecipesResponse>(`${BASE_URL}?limit=100`);

export const searchRecipes = (query: string) =>
  request<RecipesResponse>(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);

export const getRecipeById = (id: string | number) =>
  request<Recipe>(`${BASE_URL}/${id}`);
```

### Langkah 3 — Hooks TanStack Query: `hooks/useRecipes.ts`

```ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRecipeById, getRecipes, searchRecipes } from "@/api/recipes";

const FIVE_MINUTES = 1000 * 60 * 5;

// Semua resep. Juga dipakai untuk pencarian bahan (difilter di klien dari cache).
export function useRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    staleTime: FIVE_MINUTES,
  });
}

// Pencarian nama → endpoint /recipes/search. Tiap kata kunci punya cache sendiri.
export function useSearchRecipes(query: string) {
  return useQuery({
    queryKey: ["recipes", "search", query],
    queryFn: () => searchRecipes(query),
    enabled: query.length > 0, // jangan fetch kalau input kosong
    staleTime: FIVE_MINUTES,
    placeholderData: keepPreviousData, // hasil lama tetap tampil saat hasil baru dimuat
  });
}

// Detail resep → cache per id.
export function useRecipe(id?: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id as string),
    enabled: !!id,
    staleTime: FIVE_MINUTES,
  });
}
```

### Langkah 4 — Debounce: `hooks/useDebounce.ts`

```ts
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
```

Tujuannya agar request pencarian tidak dikirim di setiap ketukan tombol, hanya setelah pengguna berhenti mengetik ±400 ms.

### Langkah 5 — Tema: `constants/theme.ts`

```ts
export const colors = {
  primary: "#E8590C",
  background: "#FFF8F3",
  surface: "#FFFFFF",
  text: "#212529",
  textMuted: "#6C757D",
  border: "#EADFD6",
  chip: "#FFE8D6",
  error: "#C92A2A",
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
export const radius = { sm: 8, md: 12, lg: 16, pill: 999 };
```

### Langkah 6 — Provider: `app/_layout.tsx`

```tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";
import { colors } from "@/constants/theme";

// Beri tahu TanStack Query status koneksi → otomatis refetch saat online kembali
onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => setOnline(!!state.isConnected)),
);

// Dibuat di luar komponen agar cache tidak ter-reset saat re-render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // ulangi 2x bila gagal
      gcTime: 1000 * 60 * 30, // cache disimpan 30 menit setelah tidak dipakai
      refetchOnReconnect: true,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.primary,
          headerTitleStyle: { color: colors.text },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Resep Masakan" }} />
        <Stack.Screen name="recipe/[id]" options={{ title: "Detail Resep" }} />
      </Stack>
    </QueryClientProvider>
  );
}
```

### Langkah 7 — Komponen state: `components/StateViews.tsx`

```tsx
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, radius, spacing } from "@/constants/theme";

export function LoadingView({
  message = "Memuat data…",
}: {
  message?: string;
}) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.muted}>{message}</Text>
    </View>
  );
}

export function ErrorView({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.center}>
      <Text style={styles.errorTitle}>Terjadi kesalahan</Text>
      <Text style={styles.muted}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Coba Lagi</Text>
      </Pressable>
    </View>
  );
}

export function EmptyView({ message }: { message: string }) {
  return (
    <View style={styles.center}>
      <Text style={styles.muted}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.md,
  },
  muted: { color: colors.textMuted, textAlign: "center" },
  errorTitle: { color: colors.error, fontSize: 18, fontWeight: "700" },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
```

### Langkah 8 — Search bar: `components/SearchBar.tsx`

```tsx
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";

export type SearchMode = "name" | "ingredient";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  mode: SearchMode;
  onChangeMode: (mode: SearchMode) => void;
};

export function SearchBar({ value, onChangeText, mode, onChangeMode }: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={
          mode === "name"
            ? "Cari nama resep, mis. pizza…"
            : "Cari bahan, mis. chicken…"
        }
        placeholderTextColor={colors.textMuted}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      <View style={styles.modeRow}>
        {(["name", "ingredient"] as const).map((m) => (
          <Pressable
            key={m}
            onPress={() => onChangeMode(m)}
            style={[styles.modeButton, mode === m && styles.modeButtonActive]}
          >
            <Text
              style={[styles.modeText, mode === m && styles.modeTextActive]}
            >
              {m === "name" ? "Nama" : "Bahan"}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: spacing.lg,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  input: {
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    color: colors.text,
  },
  modeRow: { flexDirection: "row", gap: spacing.sm },
  modeButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.chip,
  },
  modeButtonActive: { backgroundColor: colors.primary },
  modeText: { color: colors.primary, fontWeight: "600" },
  modeTextActive: { color: "#fff" },
});
```

### Langkah 9 — Kartu resep: `components/RecipeCard.tsx`

```tsx
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { colors, radius, spacing } from "@/constants/theme";
import type { Recipe } from "@/types/recipe";

type Props = { recipe: Recipe; onPress: () => void };

export function RecipeCard({ recipe, onPress }: Props) {
  const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const category = [recipe.cuisine, recipe.mealType?.[0]]
    .filter(Boolean)
    .join(" • ");

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.metaRow}>
          {totalMinutes > 0 && (
            <Text style={styles.meta}>⏱ {totalMinutes} menit</Text>
          )}
          <Text style={styles.meta}>⭐ {recipe.rating.toFixed(1)}</Text>
          <Text style={styles.meta}>{recipe.difficulty}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  pressed: { opacity: 0.85 },
  image: { width: "100%", height: 170, backgroundColor: colors.chip },
  body: { padding: spacing.lg, gap: spacing.xs },
  title: { fontSize: 18, fontWeight: "700", color: colors.text },
  category: { fontSize: 13, color: colors.primary, fontWeight: "600" },
  metaRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.xs },
  meta: { fontSize: 13, color: colors.textMuted },
});
```

### Langkah 10 — Layar daftar + pencarian: `app/index.tsx`

```tsx
import { useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { RecipeCard } from "@/components/RecipeCard";
import { SearchBar, type SearchMode } from "@/components/SearchBar";
import { EmptyView, ErrorView, LoadingView } from "@/components/StateViews";
import { colors, spacing } from "@/constants/theme";
import { useDebounce } from "@/hooks/useDebounce";
import { useRecipes, useSearchRecipes } from "@/hooks/useRecipes";

export default function HomeScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [mode, setMode] = useState<SearchMode>("name");
  const term = useDebounce(text.trim(), 400);

  const allQuery = useRecipes(); // semua resep (cache)
  const nameQuery = useSearchRecipes(mode === "name" ? term : ""); // pencarian nama (server)

  const useNameSearch = mode === "name" && term.length > 0;
  const active = useNameSearch ? nameQuery : allQuery;

  const recipes = useMemo(() => {
    const list = active.data?.recipes ?? [];
    // Pencarian bahan: API tidak mendukung → filter di klien dari data yang sudah di-cache
    if (mode === "ingredient" && term) {
      const q = term.toLowerCase();
      return list.filter((r) =>
        r.ingredients.some((i) => i.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [active.data, mode, term]);

  let content: React.ReactNode;
  if (active.isPending) {
    content = <LoadingView message="Memuat resep…" />;
  } else if (active.isError && !active.data) {
    content = (
      <ErrorView
        message={active.error.message}
        onRetry={() => active.refetch()}
      />
    );
  } else {
    content = (
      <FlatList
        data={recipes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() =>
              router.push({
                pathname: "/recipe/[id]",
                params: { id: String(item.id) },
              })
            }
          />
        )}
        ListEmptyComponent={
          <EmptyView message={`Tidak ada resep untuk "${term}"`} />
        }
        refreshControl={
          <RefreshControl
            refreshing={active.isRefetching}
            onRefresh={() => active.refetch()}
            tintColor={colors.primary}
          />
        }
        keyboardShouldPersistTaps="handled"
      />
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={text}
        onChangeText={setText}
        mode={mode}
        onChangeMode={setMode}
      />
      {active.isError && active.data && (
        <Text style={styles.banner}>
          Gagal memperbarui data. Menampilkan data tersimpan.
        </Text>
      )}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  banner: {
    backgroundColor: colors.chip,
    color: colors.error,
    padding: spacing.sm,
    textAlign: "center",
    fontSize: 13,
  },
});
```

### Langkah 11 — Layar detail: `app/recipe/[id].tsx`

```tsx
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { ErrorView, LoadingView } from "@/components/StateViews";
import { colors, radius, spacing } from "@/constants/theme";
import { useRecipe } from "@/hooks/useRecipes";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: recipe, isPending, isError, error, refetch } = useRecipe(id);

  if (isPending) return <LoadingView message="Memuat detail resep…" />;
  if (isError)
    return <ErrorView message={error.message} onRetry={() => refetch()} />;

  const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: recipe.name }} />
      <Image
        source={{ uri: recipe.image }}
        style={styles.hero}
        contentFit="cover"
        transition={200}
      />

      <View style={styles.section}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.category}>
          {[recipe.cuisine, ...recipe.mealType].join(" • ")}
        </Text>

        <View style={styles.metaRow}>
          {totalMinutes > 0 && (
            <Meta label="Waktu" value={`${totalMinutes} mnt`} />
          )}
          <Meta label="Porsi" value={String(recipe.servings)} />
          <Meta label="Kalori" value={`${recipe.caloriesPerServing}`} />
          <Meta label="Rating" value={`⭐ ${recipe.rating.toFixed(1)}`} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Bahan-bahan</Text>
        {recipe.ingredients.map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Langkah memasak</Text>
        {recipe.instructions.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaBox}>
      <Text style={styles.metaValue}>{value}</Text>
      <Text style={styles.metaLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xl * 2 },
  hero: { width: "100%", height: 260, backgroundColor: colors.chip },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  title: { fontSize: 24, fontWeight: "800", color: colors.text },
  category: { fontSize: 14, color: colors.primary, fontWeight: "600" },
  metaRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  metaBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  metaValue: { fontSize: 15, fontWeight: "700", color: colors.text },
  metaLabel: { fontSize: 12, color: colors.textMuted },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.sm,
  },
  listItem: { fontSize: 15, color: colors.text, lineHeight: 22 },
  stepRow: { flexDirection: "row", gap: spacing.md, alignItems: "flex-start" },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  stepNumberText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  stepText: { flex: 1, fontSize: 15, color: colors.text, lineHeight: 22 },
});
```

> Jalankan `npx expo start`. Jika pesan _typed routes_ mengeluh soal `/recipe/[id]`, hentikan dan jalankan ulang server agar tipe rute dibuat ulang.

---

## 5. Penjelasan TanStack Query (untuk README / demo / ditanya dosen)

| Konsep                              | Di mana dipakai                                           | Penjelasan singkat                                                                                     |
| ----------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `QueryClientProvider`               | `app/_layout.tsx`                                         | Menyediakan _cache_ global ke seluruh aplikasi                                                         |
| `queryKey`                          | `['recipes']`, `['recipes','search',q]`, `['recipe', id]` | "Alamat" cache. Key berbeda = cache berbeda.                                                           |
| `queryFn`                           | `api/recipes.ts`                                          | Fungsi yang benar-benar memanggil REST API                                                             |
| **Caching**                         | `staleTime` 5 menit, `gcTime` 30 menit                    | Selama _fresh_, data diambil dari cache tanpa request baru                                             |
| **Loading**                         | `isPending`                                               | `true` hanya saat belum ada data sama sekali (muat pertama)                                            |
| **Error handling**                  | `isError`, `error`, `retry: 2`, tombol "Coba Lagi"        | Otomatis dicoba ulang 2×; jika tetap gagal, tampil pesan dan tombol `refetch()`                        |
| **Refetch**                         | `refetch()`, pull-to-refresh, `refetchOnReconnect`        | Ambil ulang manual atau otomatis saat koneksi pulih                                                    |
| `enabled`                           | `useSearchRecipes`, `useRecipe`                           | Query tidak jalan sampai kondisi terpenuhi (input kosong → tidak fetch)                                |
| `placeholderData: keepPreviousData` | `useSearchRecipes`                                        | Hasil lama tetap tampil saat hasil pencarian baru dimuat                                               |
| Pencarian bahan                     | `app/index.tsx`                                           | Memfilter array `ingredients` dari data `['recipes']` yang sudah di-cache → **tanpa request tambahan** |

**Cara menunjukkan caching saat demo:**

1. Buka daftar → buka detail resep → kembali ke daftar: daftar muncul **tanpa spinner**.
2. Buka detail resep yang **sama** lagi: tampil **instan**.
3. Ketik kata kunci yang pernah dicari → hasil langsung muncul dari cache.
4. (Opsional) tampilkan jam data terakhir diperbarui dengan `new Date(active.dataUpdatedAt).toLocaleTimeString()`.

---

## 6. Panduan styling dan layout (sederhana tapi rapi)

**Prinsip:** konsisten, lega, mudah dibaca. Cukup tema satu warna utama + netral.

| Elemen                         | Aturan                                                                                                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Palet**                      | Primary `#E8590C` (oranye), background `#FFF8F3`, surface (kartu) `#FFFFFF`, teks `#212529`, teks pudar `#6C757D`. Semua diambil dari `constants/theme.ts`, jangan tulis warna langsung di komponen. |
| **Spacing**                    | Kelipatan 4/8: `4, 8, 12, 16, 24`. Padding layar `16`, jarak antar kartu `16`, jarak di dalam kartu `12–16`.                                                                                         |
| **Radius**                     | Kartu `16`, input/kotak kecil `12`, tombol "pil" `999`.                                                                                                                                              |
| **Tipografi**                  | Judul layar 24/800, judul kartu 18/700, body 15 (line-height 22), teks meta 13. Maksimal 3 ukuran per layar.                                                                                         |
| **Kartu**                      | Gambar di atas (tinggi 170, `contentFit="cover"`), lalu nama, kategori (warna primary), baris meta. Border tipis + bayangan halus (`elevation: 2` untuk Android).                                    |
| **Layout daftar**              | Satu kolom `FlatList` dengan `contentContainerStyle` padding 16 dan `ItemSeparatorComponent` setinggi 16. Satu kolom paling aman untuk layar HP.                                                     |
| **Search bar**                 | Menempel di atas (di luar `FlatList`) supaya tidak ikut ter-scroll; di bawahnya toggle "Nama / Bahan" berbentuk pil.                                                                                 |
| **Detail**                     | `ScrollView`: gambar hero 260 → judul → kotak meta (4 kolom `flex: 1`) → bahan (bullet) → langkah (nomor dalam lingkaran).                                                                           |
| **State kosong/loading/error** | Selalu di tengah layar (`flex: 1`, `alignItems/justifyContent: 'center'`) dengan teks pendek yang jelas.                                                                                             |
| **Sentuhan**                   | Area sentuh minimal ±44 px, beri umpan balik `pressed` (opacity 0.85).                                                                                                                               |
| **Keyboard**                   | `keyboardShouldPersistTaps="handled"` pada `FlatList` agar kartu bisa ditekan sekalipun keyboard terbuka.                                                                                            |

Tips layout Flexbox di RN: arah default `column`; pakai `flexDirection: 'row'` untuk baris meta, `gap` untuk jarak, `flex: 1` agar elemen membagi ruang sama rata.

---

## 7. Pengerjaan lebih cepat (urutan prioritas jika waktu mepet)

1. **Wajib dulu** (≈ 25 menit): setup → `api` → `hooks` → layar daftar tanpa pencarian → layar detail.
2. **Pencarian nama** (≈ 5 menit) dengan debounce.
3. **Pencarian bahan** (≈ 3 menit): hanya filter klien.
4. **Loading/Error/Retry** (sudah ada di komponen StateViews; tinggal diuji).
5. **README + screenshot + pengujian** (≈ 8 menit).
6. Bonus bila sempat: banner offline, `numColumns` dua kolom di tablet, filter `cuisine` via `/recipes/tag/...`.

---

## 8. README.md yang disarankan (isi minimal)

```markdown
# Aplikasi Resep Masakan (React Native + Expo)

Aplikasi resep sederhana terinspirasi Cookpad. Data dari DummyJSON Recipes API
dan dikelola dengan TanStack Query (server state).

## Fitur

- Daftar resep (nama, gambar, kategori, waktu memasak)
- Cari resep berdasarkan nama (endpoint /recipes/search) dan bahan (filter di klien, karena API tidak mendukung)
- Detail resep (gambar, bahan, langkah)
- Loading, error handling (retry + tombol Coba Lagi), dan caching (TanStack Query)

## Menjalankan

npm install
npx expo start

## Struktur folder

(salin struktur dari panduan)

## Keputusan desain

- Kategori = cuisine + mealType (API tidak punya field category)
- Pencarian bahan memfilter data di cache karena API tidak menyediakan endpoint pencarian bahan
```

---

## 9. Pengujian aplikasi (15% rubrik "Loading, error handling, dan pengujian")

Lakukan semua skenario di bawah dan **ambil screenshot/rekaman** sebagai bukti.

| #   | Skenario                | Langkah                                                               | Hasil yang diharapkan                                               | ✔   |
| --- | ----------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------- | --- |
| 1   | Muat daftar             | Buka aplikasi                                                         | Spinner → daftar 50 resep tampil dengan gambar, kategori, waktu     | ☐   |
| 2   | Cari nama               | Mode "Nama", ketik `pizza`                                            | Hanya resep terkait pizza; tidak request di tiap ketukan (debounce) | ☐   |
| 3   | Cari nama tanpa hasil   | Ketik `zzzz`                                                          | Pesan "Tidak ada resep…"                                            | ☐   |
| 4   | Cari bahan              | Mode "Bahan", ketik `garlic`                                          | Hanya resep yang bahannya mengandung _garlic_                       | ☐   |
| 5   | Detail                  | Tekan salah satu kartu                                                | Gambar, daftar bahan, langkah bernomor tampil                       | ☐   |
| 6   | Caching daftar          | Dari detail tekan Back                                                | Daftar langsung tampil, **tanpa spinner**                           | ☐   |
| 7   | Caching detail          | Buka resep yang sama lagi                                             | Tampil instan                                                       | ☐   |
| 8   | Pull-to-refresh         | Tarik daftar ke bawah                                                 | Indikator refresh, data diperbarui                                  | ☐   |
| 9   | Error (belum ada data)  | Matikan Wi-Fi/Data **sebelum** membuka aplikasi                       | Setelah _retry_, muncul pesan error + tombol **Coba Lagi**          | ☐   |
| 10  | Pulih dari error        | Nyalakan koneksi → tekan **Coba Lagi**                                | Data berhasil dimuat                                                | ☐   |
| 11  | Error (sudah ada cache) | Muat daftar → matikan koneksi → tarik untuk refresh                   | Data lama tetap tampil + banner "Gagal memperbarui…"                | ☐   |
| 12  | Error 404               | Sementara ubah URL detail ke id yang tidak ada (mis. `/recipes/9999`) | Layar detail menampilkan error, bukan crash                         | ☐   |
| 13  | Koneksi lambat          | Aktifkan _network throttling_ (atau pakai jaringan lemah)             | Loading tampil jelas, aplikasi tidak freeze                         | ☐   |

Simulasi error cepat: ubah `BASE_URL` di `api/recipes.ts` menjadi alamat salah (mis. `https://dummyjson.com/recipez`), lihat tampilan error, lalu kembalikan.

---

## 10. Troubleshooting

| Masalah                                 | Penyebab / solusi                                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `Unable to resolve "@/..."`             | Pastikan `tsconfig.json` memiliki `"paths": { "@/*": ["./*"] }` (default template) dan restart Metro: `npx expo start -c` |
| Layar putih setelah `reset-project`     | Pastikan ada `app/_layout.tsx` dan `app/index.tsx`                                                                        |
| HP tidak bisa terhubung ke Expo         | Satu jaringan Wi-Fi; coba `npx expo start --tunnel`                                                                       |
| Gambar tidak muncul                     | Pastikan memakai `expo-image` (`npx expo install expo-image`) dan URL gambar `https://`                                   |
| Error TypeScript pada `router.push`     | Restart `npx expo start` agar typed routes dibuat ulang                                                                   |
| `isLoading` / `cacheTime` tidak dikenal | Itu API v4. Di **v5** pakai `isPending` dan `gcTime` (seperti di panduan ini)                                             |
| Hanya 30 resep yang muncul              | Pastikan memakai `?limit=100` pada endpoint daftar                                                                        |

---

## 11. Checklist pengumpulan

- [ ] Aplikasi berjalan tanpa error (`npx expo start`).
- [ ] Daftar resep: **nama, gambar, kategori, waktu**.
- [ ] Pencarian **nama** dan pencarian **bahan** berfungsi.
- [ ] Detail: **gambar, bahan, langkah**.
- [ ] **TanStack Query** dipakai untuk list, search, dan detail (ada `staleTime`/`gcTime`).
- [ ] **Loading, error + tombol coba lagi, empty state** ada.
- [ ] Struktur folder rapi (`app`, `api`, `hooks`, `components`, `constants`, `types`).
- [ ] README berisi cara menjalankan dan keputusan desain.
- [ ] Screenshot/rekaman hasil pengujian (bagian 9).
- [ ] Hapus `node_modules` sebelum di-zip (atau sesuai ketentuan pengumpulan dosen).
