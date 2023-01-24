import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native';

import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import { useState } from 'react';

interface Props extends ModalProps {
  discord: string,
  onClose: () => void
}

export function DuoMatch({discord,onClose, ...rest}:Props) {

  const [isCopping, setIsCopping] = useState(false)

  async function handleCopyDiscordClicpboard() {
    setIsCopping(true)
    await Clipboard.setStringAsync(discord)
    Alert.alert('Discord copiado!')
    setIsCopping(false)
  }

  return (
    <Modal 
    transparent 
    statusBarTranslucent
    animationType='fade'
    {...rest}>
      <View style={styles.container}>

       <View style={styles.content}>

          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIcon}
          >
            <MaterialIcons 
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading 
            title='Let’s play!'
            subtitle='Agora é só começar a jogar!'
            style={{alignItems: 'center', marginTop: 24}}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

         <TouchableOpacity 
          disabled={isCopping}
          onPress={handleCopyDiscordClicpboard} 
          style={styles.discordButton}>
          <Text style={styles.discord}>
              { isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
            </Text>
         </TouchableOpacity>

       </View>

      </View>
    </Modal>
  );
}