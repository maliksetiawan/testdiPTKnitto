// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Login from './src/components/Login';
import Home from './src/components/Home';
import Bookmark from './src/components/Bookmark';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Bookmark" component={Bookmark} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
