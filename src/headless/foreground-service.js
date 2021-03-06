import VIForegroundService from '@voximplant/react-native-foreground-service';
import { Platform } from 'react-native';


/**
 * Start Sensor's foreground service
 * 
 * @returns Promise
 */
export const startForegroundService = async () => {
  if (Platform.Version >= 26) {
    const channelConfig = {
        id: 'ForegroundServiceChannel',
        name: 'Notification Channel',
        description: 'Notification Channel for Foreground Service',
        enableVibration: false,
        importance: 2
    };
    await VIForegroundService.createNotificationChannel(channelConfig);
  }
  const notificationConfig = {
    id: 3456,
    title: 'Distance Sensor',
    text: 'Distance Sensor is running..',
    icon: 'ic_notification',
    priority: 0
  };
  if (Platform.Version >= 26) {
      notificationConfig.channelId = 'ForegroundServiceChannel';
  }
  return await VIForegroundService.startService(notificationConfig);
};


/**
 * Stop Sensor's foreground service
 * 
 * @returns Promise
 */
export const stopForegroundService = async () => {
  return await VIForegroundService.stopService()
    .catch(error => {
      console.log(error);
    });
}