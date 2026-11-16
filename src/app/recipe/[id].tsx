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
  if (isError || !recipe) {
    return (
      <ErrorView
        message={error?.message ?? "Resep tidak ditemukan."}
        onRetry={() => refetch()}
      />
    );
  }

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
          <Text key={`${item}-${index}`} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Langkah memasak</Text>
        {recipe.instructions.map((step, index) => (
          <View key={`${step}-${index}`} style={styles.stepRow}>
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
