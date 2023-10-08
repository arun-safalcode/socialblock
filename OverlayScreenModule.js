// OverlayScreenModule.js

import { NativeModules } from 'react-native';

const { OverlayScreenModule } = NativeModules;

export default {
  showOverlayScreen: () => OverlayScreenModule.showOverlayScreen(),
  removeOverlayScreen: () => OverlayScreenModule.removeOverlayScreen(),
};
