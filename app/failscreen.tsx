import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';

export default function GameOverScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DO NOT PRESS THE BUTTON BEFORE IT TURNS GREEN!</Text>
      <View style={styles.buttonContainer}>
        <Link href='/' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>
        </Link>

        <Link href='/test' asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
