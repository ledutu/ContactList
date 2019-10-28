import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import Profile from './screens/Profile';
import Contacts from './screens/Contacts';
import User from './screens/User';
import Favorites from './screens/Favorites';
import colors from './utils/colors';
import Options from './screens/Options';

const getDrawerItemIcon = ({ tintColor }, icon) => {
    <Icon name={icon} size={22} style={{ color: tintColor }} />
}

const ContactsScreens = createStackNavigator(
    {
        Contacts: Contacts,
        Profile: Profile,
    },
    {
        initialRouteName: 'Contacts',
        navigationOptions: {
            // tabBarIcon: ({ tintColor }) => (
            //     <Icon name='list' size={26} color={tintColor} />
            // )
            drawerIcon: ({ tintColor }) => (
                <Icon name='list' size={22} color={tintColor} />
            ),
        }
    }
);

const FavoritesScreens = createStackNavigator(
    {
        Favorites: Favorites,
        Profile: Profile
    },
    {
        initialRouteName: 'Favorites',
        navigationOptions: {
            // tabBarIcon: ({ tintColor }) => (
            //     <Icon name='star' size={26} color={tintColor} />
            // )
            drawerIcon: ({ tintColor }) => (
                <Icon name='star' size={22} color={tintColor} />
            ),
        }
    }
);

const UserScreens = createStackNavigator(
    {
        User: User,
        Options: Options,
    },
    {
        mode: "modal",
        initialRouteName: 'User',
        navigationOptions: {
            // tabBarIcon: ({ tintColor }) => (
            //     <Icon name='person' size={26} color={tintColor} />
            // )
            drawerIcon: ({ tintColor }) => (
                <Icon name='person' size={22} color={tintColor} />
            ),
        }
    }
)


// const TabNavigator = createBottomTabNavigator(
//     {
//         Contacts: ContactsScreens,
//         Favorites: FavoritesScreens,
//         User: UserScreens,
//     },
//     {
//         initialRouteName: 'Contacts',
//         tabBarOptions: {
//             style: {
//                 backgroundColor: colors.greyLight,
//             },
//             showLabel: false,
//             showIcon: true,
//             activeTintColor: colors.blue,
//             inactiveTintColor: colors.greyDark,
//             renderIndicator: () => null,
//         }
//     }
// );

const DrawerNavigator = createDrawerNavigator(
    {
        Contacts: ContactsScreens,
        Favorites: FavoritesScreens,
        User: UserScreens,
    },
    {
        initialRouteName: 'Contacts',
    }
)

export default createAppContainer(DrawerNavigator);
