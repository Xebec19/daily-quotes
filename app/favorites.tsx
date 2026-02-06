import { QuoteCard } from "@/components/QuoteCard";
import { useFavorites } from "@/hooks/useFavorites";
import type { Quote } from "@/types/quote";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import quotes from "../assets/templates/quotes.json";

export default function FavoritesScreen() {
  const { favoriteQuotes, toggleFavorite, isFavorite, refreshFavorites } =
    useFavorites(quotes as Quote[]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFavorites();
    setRefreshing(false);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <MaterialIcons
          name="favorite-border"
          size={64}
          color="rgba(255,255,255,0.2)"
        />
      </View>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyMessage}>
        Tap the heart icon on any quote to save it to your favorites.
      </Text>
      <Pressable style={styles.browseButton} onPress={() => router.back()}>
        <Text style={styles.browseButtonText}>Browse Quotes</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      {favoriteQuotes.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favoriteQuotes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <QuoteCard
              quote={item}
              isFavorite={true}
              onToggle={() => toggleFavorite(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3713ec"
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const PRIMARY = "#3713ec";
const BG_DARK = "#131022";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_DARK,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  emptyMessage: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
