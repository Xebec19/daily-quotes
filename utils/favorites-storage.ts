import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export async function getFavorites(): Promise<Set<string>> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!data) {
      return new Set<string>();
    }
    const ids = JSON.parse(data) as string[];
    return new Set(ids);
  } catch (error) {
    console.error('Error loading favorites:', error);
    return new Set<string>();
  }
}

export async function saveFavorite(id: string): Promise<void> {
  try {
    const current = await getFavorites();
    current.add(id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...current]));
  } catch (error) {
    console.error('Error saving favorite:', error);
  }
}

export async function removeFavorite(id: string): Promise<void> {
  try {
    const current = await getFavorites();
    current.delete(id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...current]));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
}

export async function toggleFavorite(id: string): Promise<boolean> {
  try {
    const current = await getFavorites();
    if (current.has(id)) {
      current.delete(id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...current]));
      return false; // Removed
    } else {
      current.add(id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...current]));
      return true; // Added
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
}
