import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

const PermissionsModule = NativeModules.OverlayPermission;

export const requestNotificationPermission = () => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_NOTIFICATION_POLICY
    ).then(granted => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification access granted.');
      } else {
        console.log('Notification access denied.');
      }
    });
  }
};

export const requestOverlayPermission = () => {
  PermissionsModule.requestOverlayPermission();
};

export const requestUsageAccessPermission = () => {
  PermissionsModule.requestUsageAccessPermission();
};

export const requestAccessibilityPermission = () => {
  PermissionsModule.requestAccessibilityPermission();
};
