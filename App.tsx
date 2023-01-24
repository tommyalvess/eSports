import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

import { Loading } from './src/components/Loading';
import { Background } from './src/components/Background';
import { Routes } from './src/routes';

import {Subscription} from 'expo-modules-core'//observar quando tem uma notificacao 

import './src/services/notificationConfig'
import { getPushNotificationToken } from './src/services/getPushNotificationTokem';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListner = useRef<Subscription>()// para responder a uma notificacao, tipo ir ate o app

  useEffect(() => {
    getPushNotificationToken()
  })

  useEffect(() => {
    getNotificationListener.current = Notifications
    .addNotificationReceivedListener(notification => {
      
    })

    responseNotificationListner.current = Notifications.addNotificationResponseReceivedListener(notification => {

    })

    //limpando os listner
    return () => {
      if (getNotificationListener.current && responseNotificationListner.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(responseNotificationListner.current)
      }
    }

  },[])

  return (
    <Background>
      <StatusBar style="light" backgroundColor='transparent' translucent/>
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
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
