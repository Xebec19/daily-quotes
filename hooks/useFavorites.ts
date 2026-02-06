import { useEffect, useState } from 'react';
import { getFavorites, toggleFavorite as toggleFavoriteStorage } from '@/utils/favorites-storage';
import type { Quote } from '@/types/quote';

interface UseFavoritesReturn {
  favorites: Set<string>;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (quote: Quote) => Promise<void>;
  favoriteQuotes: Quote[];
  refreshFavorites: () => Promise<void>;
}

export function useFavorites(allQuotes: Quote[]): UseFavoritesReturn {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const ids = await getFavorites();
    setFavoriteIds(ids);
  };

  const refreshFavorites = async () => {
    await loadFavorites();
  };

  const isFavorite = (id: string) => favoriteIds.has(id);

  const toggleFavorite = async (quote: Quote) => {
    await toggleFavoriteStorage(quote._id);
    const updated = await getFavorites();
    setFavoriteIds(updated);
  };

  const favoriteQuotes = allQuotes.filter((q) => favoriteIds.has(q._id));

  return {
    favorites: favoriteIds,
    isFavorite,
    toggleFavorite,
    favoriteQuotes,
    refreshFavorites,
  };
}
