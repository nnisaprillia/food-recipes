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
