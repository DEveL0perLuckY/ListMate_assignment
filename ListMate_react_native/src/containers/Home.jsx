import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontFamily } from '../../GlobalStyles';

function Home() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.img} source={require('../assets/icon.png')} />
        </View>
        <Text style={styles.title}>Welcome to List Mate</Text>

      </ScrollView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: FontFamily.Arial,
    color: '#333',
  },

  img: {
    width: 100,
    height: 100,
  },
});
