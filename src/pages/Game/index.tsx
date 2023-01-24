import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';

import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { THEME } from '../../theme';

import logImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { DuoCard } from '../../components/DuoCard';
import { URL } from '../Home';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {

  const route = useRoute()
  const game = route.params as GameParams

  const [duos,setDuos] = useState([])
  const [discordDuoSelected,setDiscordDuoSelected] = useState('')

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(URL+`ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(URL+`games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => {
      setDuos(data)
    } )
  },[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image 
            source={logImg}
            style={styles.logo}
          />
          <View style={styles.right}/>
        </View>

        <Image 
            resizeMode="cover"
            source={{ uri: game.bannerUrl }} 
            style={styles.cover}/>

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          horizontal
          renderItem={ ( {item} ) => (
            <DuoCard 
              date={item}
              onConnect={() => getDiscordUser(item.id)}
              />
          )}
          style={styles.containerList}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent= {() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda
            </Text>
          )}
        />
     
        <DuoMatch 
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('') }
        />

      </SafeAreaView>
    </Background>
   
  );
}