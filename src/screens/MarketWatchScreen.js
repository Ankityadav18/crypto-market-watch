import React, { useState, useMemo } from 'react';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import { initialCryptoData } from '../data/initialData';
import CryptoRow from "../Components/CryptoRow"
import { usePriceSimulator } from '../hooks/usePriceSimulator';

const MarketWatchScreen = () => {
  const [data, setData] = useState(initialCryptoData);
  const [sortType, setSortType] = useState('PRICE');

  usePriceSimulator(setData);

  const sortedData = useMemo(() => {
    const list = [...data];
    if (sortType === 'PRICE') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortType === 'CHANGE') {
      return list.sort((a, b) => b.change - a.change);
    }
    return list;
  }, [data, sortType]);

  return (
    <View style={styles.container}>
      {/* Title + Sort */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Crypto Market Watch</Text>
        <View style={styles.sortBar}>
          <Button title="Price" onPress={() => setSortType('PRICE')} />
          <Button title="24h %" onPress={() => setSortType('CHANGE')} />
        </View>
      </View>

      {/* Column Headers */}
      <View style={styles.header}>
        <Text style={styles.headerText}>PAIR</Text>
        <Text style={[styles.headerText, styles.center]}>PRICE</Text>
        <Text style={[styles.headerText, styles.right]}>24H %</Text>
      </View>

      {/* List */}
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CryptoRow item={item} />}
      />
    </View>
  );
};

export default MarketWatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
  sortBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});
