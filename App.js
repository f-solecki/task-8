import { postcodeValidator } from 'postcode-validator';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function App() {

  const handlerSubmit = () => {
    setCodeError(false)
    setIsEmpty(false)
    if (done === true) {
      Alert.alert(
        'Your data is:', 'Name: ' + name +
        '\nSurname: ' + surname +
        '\nAddress: ' + address +
        '\nCity: ' + city +
        '\nZip/Postal code: ' + code
      )
    } else {
      if (name === '' || surname === '' || address === '' || city === '' || code === '') {
        setIsEmpty(true)
      }
      else {
        setCodeError(true)
      }
    }
  }

  const checkDone = () => {
    if (name != '' && surname != '' && address != '' && city != '' && code != '') {
      if (postcodeValidator(code, 'PL')) {
        isDone(true)
      } else {
        isDone(false)
      }
    } else {
      isDone(false)
    }
  }

  useEffect(() => {
    checkDone()
  });

  const [name, setNewName] = useState('')
  const [surname, setNewSurname] = useState('')
  const [address, setNewAddress] = useState('')
  const [city, setNewCity] = useState('')
  const [code, setNewCode] = useState('')
  const [done, isDone] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <View>
          <View style={styles.label}>
            <Text>First name <Text style={{ color: 'red' }}>*</Text> </Text>
          </View>
          <View style={styles.label}>
            <Text>Last name <Text style={{ color: 'red' }}>*</Text> </Text>
          </View>
          <View style={styles.label}>
            <Text>Address Line <Text style={{ color: 'red' }}>*</Text> </Text>
          </View>
          <View style={styles.label}>
            <Text>City <Text style={{ color: 'red' }}>*</Text> </Text>
          </View>
          <View style={styles.label}>
            <Text>Zip/Postal code <Text style={{ color: 'red' }}>*</Text> </Text>
          </View>
        </View>
        <View>
          <Text style={{ color: 'red', display: isEmpty ? 'flex' : 'none' }}>There are/is empty required fields!</Text>

          <TextInput value={name} onChangeText={text => setNewName(text)}
            style={styles.textInput} />
          <TextInput value={surname} onChangeText={text => setNewSurname(text)}
            style={styles.textInput} />
          <TextInput value={address} onChangeText={text => setNewAddress(text)}
            style={styles.textInput} />
          <TextInput value={city} onChangeText={text => setNewCity(text)}
            style={styles.textInput} />
          <TextInput value={code} onChangeText={text => setNewCode(text)}
            style={styles.textInput} />
          <Text style={{ color: 'red', display: codeError ? 'flex' : 'none' }}>Bad Postal Code format!</Text>
        </View>
      </View>
      <TouchableOpacity style={{ marginTop: 30, alignSelf: 'center', backgroundColor: done ? 'red' : 'gray', width: 150, alignItems: 'center', height: 35, justifyContent: 'center', borderRadius: 20 }}><Text style={{
        color: 'white', fontSize: 20
      }} onPress={() => handlerSubmit()}>Submit</Text></TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 2,
    width: 200,
    paddingLeft: 2,
    fontSize: 18,
    height: 30,
    marginTop: 2
  },
  label: {
    height: 30,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 2
  }
});
