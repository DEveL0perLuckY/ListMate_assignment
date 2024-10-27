import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../containers/Home';
import SignInScreen from '../containers/SignInScreen';
import SignUpScreen from '../containers/SignUpScreen';
import GetStartedScreen from '../containers/GetStarted';
import {useAuth} from '../service/AuthContext';
import {Alert, TouchableOpacity} from 'react-native';
import ProfileScreen from '../containers/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const {isAuthenticated, handleLogout} = useAuth();
  const logoutHandler = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            handleLogout();
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          statusBarColor: '#00BFA6',
          orientation: 'portrait_up',
        }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="GettingStarted"
          component={GetStartedScreen}
        />
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Tabs"
              options={{
                title: 'List Mate',
                headerRight: () => (
                  <TouchableOpacity activeOpacity={0.7} onPress={logoutHandler}>
                    <Ionicons
                      name="log-out"
                      size={24}
                      color="black"
                      style={{marginRight: 15}}
                    />
                  </TouchableOpacity>
                ),
              }}
              component={TabNavigator}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SignIn"
              component={SignInScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SignUp"
              component={SignUpScreen}
            />
          </>
        )}
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
      component={ProfileScreen}
    />
  </Tab.Navigator>
);
