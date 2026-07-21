import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import PrefilledFormScreen from '../screens/PrefilledFormScreen';
import BiometricAuthScreen from '../screens/BiometricAuthScreen';
import CompletionScreen from '../screens/CompletionScreen';
import DandiScanScreen from '../screens/DandiScanScreen';
import DandiNudgeScreen from '../screens/DandiNudgeScreen';
import DandiResultScreen from '../screens/DandiResultScreen';
import TtokdiScanScreen from '../screens/TtokdiScanScreen';
import TtokdiNudgeScreen from '../screens/TtokdiNudgeScreen';
import TtokdiResultScreen from '../screens/TtokdiResultScreen';

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
        <Stack.Screen
          name="DandiScan"
          component={DandiScanScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="DandiNudge"
          component={DandiNudgeScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="DandiResult" component={DandiResultScreen} />
        <Stack.Screen
          name="TtokdiScan"
          component={TtokdiScanScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="TtokdiNudge"
          component={TtokdiNudgeScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="TtokdiResult" component={TtokdiResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
