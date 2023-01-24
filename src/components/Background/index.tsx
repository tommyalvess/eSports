import {
    ImageBackground,
  View
} from 'react-native';

import { styles } from './styles';

//Image
import backgroundImg from '../../assets/background-galaxy.png'

interface Props {
    children: React.ReactNode
}

export function Background( {children} : Props ){
  return (
    <ImageBackground 
        source={backgroundImg}
        defaultSource={backgroundImg}// ele memoria a memoria padrão, assim acelera. 
        style={styles.container}>
        {children}
    </ImageBackground>
  );
}