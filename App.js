import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import TaskList from './TaskList';
import { Provider } from 'react-redux';
import store from './Redux_Toolkit/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="TaskList" component={TaskList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}