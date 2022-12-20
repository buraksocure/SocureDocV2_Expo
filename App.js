import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Socure from 'rn-socure-sdk';

export default function App() {

  const [isUploading, setUploading] = useState(false);

  const startLicense = () => {
    Socure.scanLicense().then((res) => {
      console.log('RES: ', res);
      notifyMessage("Captured License")
    }, err => {
      console.log("Error: ", err)
      notifyMessage(err.message)
    });
  };

  const startPassport = () => {
    Socure.scanPassport().then((res) => {
      console.log('RES: ', res);
      notifyMessage("Captured Passport")
    }, err => {
      console.log("Error: ", err)
      notifyMessage(err.message)
    });
  };

  const startSelfie = () => {
    Socure.captureSelfie().then((res) => {
      console.log('RES: ', res);
      notifyMessage("Captured Selfie")
    }, err => {
      console.log("Error: ", err)
      notifyMessage(err.message)
    });
  };

  const setPublicKey = () => {
    try {
      Socure.setSocureSdkKey("YOUR_DOCV_SDK_KEY")
      notifyMessage("Public key set")
    } catch (ex) {
      notifyMessage(ex)
    }
  };

  const uploadScannedInfo = () => {
    setUploading(true)
    Socure.uploadScannedInfo().then((res) => {
      setUploading(false)
      console.log('RES: ', res);
      notifyMessage("Upload Success")
    }, err => {
      setUploading(false)
      console.log("Error: ", err)
      notifyMessage(err.message)
    });
  };

  const notifyMessage = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  return (
    <View style={styles.container}>
    <View>
      <Text style={styles.title}>
        Dcocument Verification in Just few Steps
      </Text>
    </View>

    <View style={styles.row1}>
      <Button
        title="Scan Passport"
        onPress={startPassport}
      />
      <Button
        title="Scan ID"
        onPress={startLicense}
      />
      <Button
        title="Take selfie"
        onPress={startSelfie}
      />
    </View>

    <View style={styles.row2}>
      <Button
        title="Set Public Key"
        onPress={setPublicKey}
        color="#841584"
      />
      <View style={styles.row3}>
        {isUploading ? <ActivityIndicator /> : null}
        <Button
          disabled={isUploading}
          title="Upload Scan"
          onPress={uploadScannedInfo}
          color="#ff8c1a"
        />
      </View>
    </View>
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

