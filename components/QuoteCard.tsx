import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { copyText } from '@/utils/copy-clipboard';
import type { Quote } from '@/types/quote';

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  onToggle: () => void;
}

export function QuoteCard({ quote, isFavorite, onToggle }: QuoteCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const copyRef = useState<number | undefined>(undefined)[0];

  const handleCopy = (text: string) => {
    copyText(text);
    setIsCopied(true);

    if (copyRef) {
      clearTimeout(copyRef);
    }

    // @ts-expect-error - setTimeout returns number in React Native
    copyRef.current = setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <Text style={styles.quote}>{`"${quote.content}"`}</Text>
        <Text style={styles.author}>— {quote.author}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          accessibilityRole="button"
          onPress={onToggle}
        >
          <MaterialIcons
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={20}
            color={isFavorite ? '#ff4757' : '#fff'}
          />
        </Pressable>

        <Pressable
          style={styles.actionButton}
          accessibilityLabel="Copy quote"
          accessibilityRole="button"
          onPress={() => handleCopy(`${quote.content} -- ${quote.author}`)}
        >
          <MaterialIcons name={isCopied ? 'done-all' : 'content-copy'} size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const PRIMARY = '#3713ec';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  contentContainer: {
    marginBottom: 16,
  },
  quote: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 12,
  },
  author: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 10,
    borderRadius: 20,
  },
});
