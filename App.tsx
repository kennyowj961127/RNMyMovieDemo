/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  StyleSheet,
  AppState,
  AppStateStatus,
} from 'react-native';
import RootNavigation from './src/container/navigation/RootNavigation';
import { configurePersistable } from 'mobx-persist-store'
import { MMKV } from "react-native-mmkv"
import { ToastProvider } from 'react-native-toast-notifications'
import { LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export const storage = new MMKV()


configurePersistable({
  storage: {
    setItem: (key, data) => storage.set(key, data),
    getItem: (key) => storage.getString(key),
    removeItem: (key) => storage.delete(key),
  },
})


const App = (): React.JSX.Element => {
  const appState = React.useRef(AppState.currentState);
  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      //console.log('## App has come to the foreground!');
    }
    appState.current = nextAppState;
    //console.log('## App State:', appState.current, nextAppState);
    if (appState.current == 'inactive') {
      //console.log('## App has come to the inactive!');
    }
    if (appState.current == 'background') {
    }
  };

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    SplashScreen?.hide();
    return () => {
    };
  }, []);
  return (
    <ToastProvider
      placement="bottom"
      animationType="zoom-in"
      animationDuration={200}
      offsetTop={0}
      offsetBottom={100}
      textStyle={{ fontSize: 16 }}
    >
      <RootNavigation />
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
});

export default App;
