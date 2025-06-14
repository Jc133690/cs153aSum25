import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const myApp = () => {
  const [testbegin, settestbegin] = useState(false);
  const [timer, settimer] = useState(Math.floor(Math.random() * 4) + 3);
  const [reactiontime, setreactiontime] = useState(0);

  useEffect(() => {
    if (!testbegin) return;
  
    const interval = setInterval(() => {
      setreactiontime((t) => t + 1);
    }, 10);
  
    return () => clearInterval(interval);
  }, [testbegin]);

  useFocusEffect(
    useCallback(() => {
      setreactiontime(0);
      settestbegin(false);
      settimer(Math.floor(Math.random() * 4) + 3);

      const interval = setInterval(() => {
        settimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            settestbegin(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PRESS THE BOX WHEN IT BECOMES GREEN</Text>
      <TouchableOpacity 
        style={testbegin ? styles.buttonafter : styles.buttonbefore} 
        onPress={() => {
          settestbegin(false);
          if(testbegin) {
            router.push({pathname: '/finishscreen', params: {reactiontime}});
          } else {
            router.push('/failscreen');
          }
        }}>
        <Text style={{ color: 'white', fontSize: 70, textAlign: 'center'}}>I am the BUTTON</Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  result: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonbefore: {
    borderRadius: 50,
    borderWidth: 10,
    borderColor: 'red',
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: 500,
  },
  buttonafter: {
    borderRadius: 50,
    borderWidth: 10,
    borderColor: 'green',
    backgroundColor: 'limegreen',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: 500,
  },
});

export default myApp;