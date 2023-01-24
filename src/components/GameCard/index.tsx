import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

export interface GameCardProps {
    id: string,
    title: string,
    _count: {ads: number},
    bannerUrl: string
}

interface Props extends TouchableOpacityProps {
    data: GameCardProps
}

export function GameCard({data, ...rest}:Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
        <ImageBackground 
            source={{uri: data.bannerUrl}}
            style={styles.cover}>
        
        <LinearGradient 
            style={styles.footer}
            colors={THEME.COLORS.FOOTER}>
            <Text style={styles.name}>{data.title}</Text>
            <Text style={styles.ads}>{data._count.ads} anúncios</Text>
        </LinearGradient>

        </ImageBackground>
    </TouchableOpacity>
  );
}