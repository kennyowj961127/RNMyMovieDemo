import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../home";
import News from "../home/news";
import Profile from "../profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "../profile/account";
import { observer } from "mobx-react-lite";
import Search from "../home/search";
import MovieDetail from "../home/movieDetail";
import Icon from "react-native-easy-icon";

const RootStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function HomeStackScreen(): React.JSX.Element {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="News" component={News} />
            <HomeStack.Screen name="MovieDetail" component={MovieDetail} />
            <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
                <HomeStack.Screen name="Search" component={Search} />
            </HomeStack.Group>
        </HomeStack.Navigator>
    );
}

function ProfileStackScreen(): React.JSX.Element {
    return (
        <ProfileStack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerShown: false,
            }}
        >
            <ProfileStack.Screen name="Profile" component={Profile} />
            <ProfileStack.Screen name="MovieDetail" component={MovieDetail} />
        </ProfileStack.Navigator>
    );
}

function BottomTabsScreen(): React.JSX.Element {
    return (
        <BottomTabs.Navigator
            initialRouteName="Home"
            screenOptions={
                {
                    headerShown: false,
                }
            }
        >
            <BottomTabs.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (
                            <Icon name="home" size={24} color={color} type='antdesign' />
                        );
                    }
                }}
            />
            <BottomTabs.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (
                            <Icon name="user" size={24} color={color} type='antdesign' />
                        );
                    }
                }}
            />
        </BottomTabs.Navigator>
    );
}

function RootStackScreen(): React.JSX.Element {
    return (
        <RootStack.Navigator
            initialRouteName="Root"
            screenOptions={{
                headerShown: false,
            }}
        >
            <RootStack.Screen name="Root" component={BottomTabsScreen} />
        </RootStack.Navigator>
    );
}

const RootNavigation = observer((): React.JSX.Element => {
    return (
        <NavigationContainer>
            <RootStackScreen />
        </NavigationContainer>
    );
});

export default RootNavigation;