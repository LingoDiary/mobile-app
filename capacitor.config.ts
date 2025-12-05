import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lingodiary',
  appName: 'Lingo Diary',
  webDir: 'dist/app/browser',
  server: {
    url: 'http://192.168.0.108:4200',
    cleartext: true
  }
};

export default config;
