import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {FontFamily, FontSize, Border, FontColor} from '../../GlobalStyles';
function Details() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:200}} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Health Statistics Details</Text>

      <Text style={styles.statTitle}>Steps Count: 8,250</Text>
      <Text style={styles.stat}>Average: 10,000 steps/day</Text>

      <Text style={styles.statTitle}>Heart Rate: 72 bpm</Text>
      <Text style={styles.stat}>Normal Range: 60-100 bpm</Text>

      <Text style={styles.statTitle}>Blood Pressure: 120/80 mmHg</Text>
      <Text style={styles.stat}>Normal Range: 120/80 mmHg</Text>

      <Text style={styles.statTitle}>Sugar Count: 90 mg/dL</Text>
      <Text style={styles.stat}>Normal Range: 70-130 mg/dL</Text>

      <Text style={styles.statTitle}>Body Analytics: 25% Body Fat</Text>
      <Text style={styles.stat}>
        Ideal Range: 18-24% for males, 25-31% for females
      </Text>
    </ScrollView>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: FontSize.size_40,
    fontFamily: FontFamily.Arial,
    textAlign: 'center',
    marginBottom: 20,
    color: FontColor.gray,
  },
  statTitle: {
    fontSize: FontSize.size_24,
    fontFamily: FontFamily.Arial,
    marginTop: 20,
    color: '#fe636e',
  },
  stat: {
    fontSize: FontSize.size_22,
    fontFamily: FontFamily.Arial,
    marginVertical: 8,
    color: FontColor.lightGray,
  },
});
