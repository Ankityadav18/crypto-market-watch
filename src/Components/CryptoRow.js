import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const CryptoRow = ({ item }) => {
  const flashAnim = useRef(new Animated.Value(0)).current;
  const isPositive = item.change >= 0;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(flashAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(flashAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  }, [item.price]);

  const priceBg = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#eef9f0'],
  });

  return (
    <View style={styles.row}>
      <Text style={styles.pair}>{item.pair}</Text>

      <Animated.Text style={[styles.price, { backgroundColor: priceBg }]}>
        ${item.price.toFixed(2)}
      </Animated.Text>

      <Text
        style={[
          styles.change,
          { color: isPositive ? '#16a34a' : '#dc2626' },
        ]}
      >
        {isPositive ? '+' : ''}
        {item.change.toFixed(2)}%
      </Text>
    </View>
  );
};

export default React.memo(CryptoRow);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  pair: {
    flex: 1.2,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  price: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 2,
    borderRadius: 4,
    color: '#111827',
  },
  change: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
  },
});
