import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import SignIn from './pages/SignIn';
import Checkins from './pages/Checkins';
import HelpOrderList from './pages/HelpOrders/HelpOrderList';
import HelpOrderInfo from './pages/HelpOrders/HelpOrderInfo';
import SendHelpOrder from './pages/HelpOrders/SendHelpOrder';

const helpOrderIcon = ({ tintColor }) => (
  <Icon name="live-help" size={20} color={tintColor} />
);

const appIcon = ({ tintColor }) => (
  <Icon name="edit-location" size={20} color={tintColor} />
);

helpOrderIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
appIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckinsSession: {
              screen: createStackNavigator({
                Checkins,
              }),
              navigationOptions: {
                headerLayoutPreset: 'center',
                tabBarVisible: true,
                tabBarLabel: 'CheckIns',
                tabBarIcon: appIcon,
              },
            },
            HelpOrdersSession: {
              screen: createStackNavigator({
                HelpOrderList,
                HelpOrderInfo,
                SendHelpOrder,
              }),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: helpOrderIcon,
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999999',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      }
    )
  );
