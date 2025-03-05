
import { createStackNavigator } from '@react-navigation/stack';
import Store from "./src/Store";
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Home from "./src/screens/Home";
import Details from "./src/screens/Details";

const Index = () => {
  const Stack = createStackNavigator();

  return (
    <Provider store={Store}>
      <PaperProvider>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </PaperProvider>
    </Provider>
  );
}

export default Index;
