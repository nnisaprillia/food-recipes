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
