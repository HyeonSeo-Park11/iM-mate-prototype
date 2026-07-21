import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import PrefilledFormScreen from '../screens/PrefilledFormScreen';
import BiometricAuthScreen from '../screens/BiometricAuthScreen';
import CompletionScreen from '../screens/CompletionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="PrefilledForm" component={PrefilledFormScreen} />
        <Stack.Screen
          name="BiometricAuth"
          component={BiometricAuthScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="Completion" component={CompletionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
