import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {FontColor, FontFamily} from '../../GlobalStyles';

function MyProfile({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Steps Count: 8,250</Text>
        <Text style={styles.stat}>Heart Rate: 72 bpm</Text>
        <Text style={styles.stat}>Blood Pressure: 120/80 mmHg</Text>
        <Text style={styles.stat}>Sugar Count: 90 mg/dL</Text>
        <Text style={styles.stat}>Body Analytics: 25% Body Fat</Text>
      </View>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('Details')}>
        <Text style={styles.detailsButtonText}>View Details</Text>
        <Ionicons name="arrow-forward" size={24} color="#fe636e" />
      </TouchableOpacity>
    </View>
  );
}

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    fontSize: 30,
    fontFamily: FontFamily.Arial,

    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statsContainer: {
    marginBottom: 20,
  },
  stat: {
    fontSize: 18,
    marginVertical: 8,
    color: FontColor.gray,
    fontFamily: FontFamily.Arial,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#fe636e',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  detailsButtonText: {
    fontSize: 18,
    marginRight: 8,
    color: '#fe636e',
    fontFamily: FontFamily.Arial,
  },
});
