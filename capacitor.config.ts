import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.efada.qesaa.app', // com.efada.qesaa.app  com.efada.qesaa.app
  appName: 'qesaa',
  webDir: 'www',
  bundledWebRuntime: false,
  // cordova: {
  //   preferences: {
  //     ShowSplashScreen: 'false',
  //     SplashScreenDelay: '0',
  //     FadeSplashScreenDuration: '0',
  //     SplashScreen: 'none',
  //     SplashShowOnlyFirstTime: 'false',
  //   },
  // },
  // plugins: {
  //   SplashScreen: {
  //     launchShowDuration: 50,

  //     launchAutoHide: false,

  //   },
  // },
  // plugins: {
  //   SplashScreen: {
  //     launchShowDuration: 4000,
  //     backgroundColor:'#eae7e8',
  //     launchAutoHide: true, //launchAutoHide: false, and splash .hide
  //     // androidSplashResourceName:'splash'
  //   },
  //   Keyboard: {
  //     resize: 'body',
  //     style: 'dark',
  //     resizeOnFullScreen: true,
  //   },
  //   // PushNotifications: {
  //   //   presentationOptions: ["badge", "sound", "alert"]
  //   // }
  // },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      splashFullScreen: false,
      splashImmersive: false,
    },
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
