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

  const allQuery = useRecipes();
  const nameQuery = useSearchRecipes(mode === "name" ? term : "");

  const useNameSearch = mode === "name" && term.length > 0;
  const active = useNameSearch ? nameQuery : allQuery;

  const recipes = useMemo(() => {
    const list = active.data?.recipes ?? [];
    if (mode === "ingredient" && term) {
      const q = term.toLowerCase();
      return list.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(q),
        ),
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
        message={active.error?.message ?? "Gagal memuat data resep."}
        onRetry={() => active.refetch()}
      />
    );
  } else {
    const emptyMessage = term
      ? `Tidak ada resep untuk "${term}"`
      : "Belum ada resep yang bisa ditampilkan.";

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
        ListEmptyComponent={<EmptyView message={emptyMessage} />}
        refreshControl={
          <RefreshControl
            refreshing={active.isRefetching}
            onRefresh={() => {
              active.refetch();
            }}
            tintColor={colors.primary}
            colors={[colors.primary]}
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
