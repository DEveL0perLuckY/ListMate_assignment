import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../containers/Home';
import MyProfile from '../containers/MyProfile';
import Details from '../containers/Details';
import SignInScreen from '../containers/SignInScreen';
import SignUpScreen from '../containers/SignUpScreen';
import GetStartedScreen from '../containers/GetStarted';
import {Alert, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const {isAuthenticated, handleLogout} = useAuth();
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true, 
          statusBarColor: '#00BFA6',
          orientation: 'portrait_up',
        }}>
        <>
          <Stack.Screen
            
            name="Tabs"
            component={TabNavigator}
          />
          <Stack.Screen name="Details" component={Details} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2E4053',
      tabBarInactiveTintColor: 'gray',
    })}
    initialRouteName="Home">
    <Tab.Screen
      name="Home"
      options={{
        headerShown: false,
      }}
      component={Home}
    />
    <Tab.Screen
      options={{
        headerShown: false,
      }}
      name="Profile"
      component={MyProfile}
    />
  </Tab.Navigator>
);
