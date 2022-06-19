import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.efada.qesaa.app',// com.efada.qesaa.app  com.efada.qesaa.app 
  appName: 'qesaa',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 5000,
      launchAutoHide: true,  //launchAutoHide: false, and splash .hide
      // androidSplashResourceName:'splash'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true,
    },
    // PushNotifications: {
    //   presentationOptions: ["badge", "sound", "alert"]
    // }
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
