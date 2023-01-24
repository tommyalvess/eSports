import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { GameController } from 'phosphor-react-native';


import { styles } from './styles';

interface DuoCardProps {
  id: string,
  name: string,
  weekDays: string[]
  useVoiceChannel: boolean,
  yearsPlaying: number,
  hourEnd: string,
  hourStart: string
}

interface Props {
  date: DuoCardProps,
  onConnect: () => void
}

export function DuoCard({date,onConnect}:Props) {
  return (
    <View style={styles.container}>
      <DuoInfo 
          label='Nome'
          value={date.name}
      />

      <DuoInfo 
          label='Tempo de jogo'
          value={`${date.yearsPlaying} anos`}
      />

      <DuoInfo 
          label='Disponibilidade'
          value={`${date.weekDays.length} dias \u2022 ${date.hourStart} - ${date.hourEnd}`}
      />

      <DuoInfo 
          label='Chamada de áudio?'
          value={date.useVoiceChannel ? "Sim":"Não"}
          colorValue={date.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity 
        onPress={onConnect}
        style={styles.button}>
         <GameController 
          color={THEME.COLORS.TEXT}
          size={20}
         />
         <Text style={styles.buttonTitle}>
          Conectar
         </Text>
      </TouchableOpacity>
    </View>
  );
} 