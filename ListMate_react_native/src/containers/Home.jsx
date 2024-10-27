import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FontFamily} from '../../GlobalStyles';

function Home() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 200}}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.img} source={require('../assets/icon.png')} />
        </View>
        <Text style={styles.title}>Welcome to Health care Hub 👋</Text>

        <Text style={styles.stepTitle}>Monitor Your Motion and Health</Text>
        <Text style={styles.Description}>
          Utilize your phone's sensors to track your daily movements, including
          steps taken, distance traveled, and activity levels. Get real-time
          feedback on your physical activity to stay active and healthy.
        </Text>

        <Text style={styles.stepTitle}>Health Data Insights</Text>
        <Text style={styles.Description}>
          Monitor your vital signs such as heart rate, blood pressure, and
          oxygen levels directly from your phone. This comprehensive overview
          helps you understand your health status better.
        </Text>

        <Text style={styles.stepTitle}>Book a Consultation</Text>
        <Text style={styles.Description}>
          Schedule appointments with your preferred healthcare providers. Both
          in-person and virtual consultations are supported, allowing you to
          seek medical advice conveniently.
        </Text>

        <Text style={styles.stepTitle}>Stay Informed</Text>
        <Text style={styles.Description}>
          Access the latest healthcare news and tips on nutrition, fitness, and
          mental health. Keep yourself updated with valuable health insights to
          make informed decisions about your wellness.
        </Text>
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
  stepTitle: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: FontFamily.Arial,
    color: 'black',
  },
  Description: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
    lineHeight: 22,
    fontFamily: FontFamily.Arial,
  },
  img: {
    width: 200,
    height: 200,
  },
});
