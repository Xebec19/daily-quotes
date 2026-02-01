import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCallback, useState } from "react";
import quotes from "../assets/templates/quotes.json";
const { width } = Dimensions.get("window");

export default function App() {
  const fetchRandomQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);

    return quotes[randomIndex];
  }, []);

  const [quote, setQuote] = useState(fetchRandomQuote());

  function updateQuote() {
    setQuote(fetchRandomQuote());
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Top Bar */}
      <View style={styles.header}>
        {/* <IconButton icon="menu" /> */}
        <Text style={styles.headerTitle}>Daily Quotes</Text>
        {/* <IconButton icon="settings" /> */}
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {/* Background glow */}
        <View style={styles.glowCenter} />

        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>{`"${quote.content}"`}</Text>
          <Text style={styles.author}>— {quote.author}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <ActionButton icon="favorite" label="Favorite" />
          <ActionButton icon="share" label="Share" />
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.primaryButton}
          onPress={updateQuote}
        >
          <MaterialIcons name="autorenew" size={22} color="#fff" />
          <Text style={styles.primaryButtonText}>New Quote</Text>
        </TouchableOpacity>
      </View>

      {/* Decorative glows */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />
    </SafeAreaView>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.actionItem}>
      <View style={styles.actionIcon}>
        <MaterialIcons name={icon} size={22} color="#fff" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ---------- Styles ---------- */

const PRIMARY = "#3713ec";
const BG_DARK = "#131022";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_DARK,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Main */
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  quoteContainer: {
    maxWidth: 360,
  },
  quote: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
    textAlign: "center",
    marginBottom: 16,
  },
  author: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },

  /* Actions */
  actions: {
    flexDirection: "row",
    gap: 24,
    marginTop: 48,
  },
  actionItem: {
    alignItems: "center",
  },
  actionIcon: {
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 16,
    borderRadius: 999,
    marginBottom: 8,
  },
  actionLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "600",
    textTransform: "uppercase",
  },

  /* Footer */
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  primaryButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: PRIMARY,
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* Glows */
  glowCenter: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: PRIMARY,
    opacity: 0.12,
  },
  glowTopRight: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: PRIMARY,
    opacity: 0.06,
  },
  glowBottomLeft: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: PRIMARY,
    opacity: 0.1,
  },
});
