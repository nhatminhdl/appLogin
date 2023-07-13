//React Navigation

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Singup';
import Welcome from '../screens/Welcome';
import { Colors } from '../Components/styles';

const {primary, tertiary} = Colors;

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor: 'tranparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle:{
                        paddingLeft: 20
                    }
                }}

                initialRouteName='Login'
            >
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Signup' component={Signup}/>
                <Stack.Screen options={{
                    headerTintColor: primary
                }} name='Welcome' component={Welcome}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;