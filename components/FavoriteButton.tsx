import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFavorite, scaleAnim]);

  const handlePress = () => {
    onToggle();
  };

  return (
    <Pressable
      style={styles.actionItem}
      accessibilityLabel={
        isFavorite ? "Remove from favorites" : "Add to favorites"
      }
      accessibilityRole="button"
      onPress={handlePress}
    >
      <Animated.View
        style={[styles.actionIcon, { transform: [{ scale: scaleAnim }] }]}
      >
        <MaterialIcons
          name={isFavorite ? "favorite" : "favorite-border"}
          size={22}
          color={isFavorite ? "#ff4757" : "#fff"}
        />
      </Animated.View>
      <Text style={styles.actionLabel}>Like</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionItem: {
    alignItems: "center",
    zIndex: 99,
  },
  actionIcon: {
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 16,
    borderRadius: 999,
  },
  actionLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
