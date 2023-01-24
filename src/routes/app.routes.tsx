import {createNativeStackNavigator} from '@react-navigation/native-stack'

import { Game } from '../pages/Game'
import { Home } from '../pages/Home'

const {Navigator, Screen} = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen 
                name='Home'
                component={Home}
            />
             <Screen 
                name='Game'
                component={Game}
            />
        </Navigator>
    )
}