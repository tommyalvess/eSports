import React, { useEffect, useState } from 'react';

import {
  FlatList,
  Image,
  View
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context'

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export var URL = 'http://192.168.1.11:3333/'

export function Home(){

  const [games,setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGame({id,title,bannerUrl}: GameCardProps) {
    navigation.navigate('Game', {id,title,bannerUrl})
  }

  useEffect(() => {
    fetch(URL+'games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    } )
  },[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        
        <Image
          source={logoImg} 
          style={styles.logo}
        />

        <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..."/>

        <FlatList 
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator
          renderItem={ ({item}) => (
            <GameCard 
              data={item} 
              onPress={() => handleOpenGame(item)}
            />
          )}
        />

      </SafeAreaView>
    </Background>
   
  );
}