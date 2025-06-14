import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const myApp = () => {
  const [name, setname] = useState('');
  const [highscore, sethighscore] = useState<number | null>(null);

  const loadHighScore = async () => {
    const stored = await AsyncStorage.getItem('highScore');
    if (stored !== null) {
      sethighscore(parseInt(stored));
    }
  };

  useEffect(() => {
    loadHighScore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reaction Time Tester</Text>

      <View style={styles.buttonContainer}>
        <Link href="/test" style={{ marginBottom: 10 }}>
          <Text style = {styles.start}>START</Text>
        </Link>
      </View>

      <Text style={styles.result}>Fastest Time</Text>
      <Text style={styles.result}>__________________</Text>
      {highscore && (
        <Text style={styles.result}>{highscore} ms</Text>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  result: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  start: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkblue',

  },
});
export default myApp
