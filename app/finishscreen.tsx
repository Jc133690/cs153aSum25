import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FinishedScreen() {
  const { reactiontime } = useLocalSearchParams();
  const [highScore, setHighScore] = useState<number | null>(null);

  const loadHighScore = async () => {
    const stored = await AsyncStorage.getItem('highScore');
    if (stored !== null) {
        if (parseInt(reactiontime.toString()) < parseInt(stored)) {
            await AsyncStorage.setItem('highScore', reactiontime.toString());
        }
    } else {
        await AsyncStorage.setItem('highScore', reactiontime.toString());
    }
  };

  useEffect(() => {
      loadHighScore();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FINISHED</Text>
      <Text style={styles.score}>Your Score: {reactiontime}</Text>
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
  },
  score: {
    fontSize: 24,
    marginBottom: 60,
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
