import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Table from './table'



export default function App() {
  return (
    <View style={styles.container}>
      <Text>HimalayaSF</Text>
      <Text>Virtual Space</Text>
      <Table name="maya" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
