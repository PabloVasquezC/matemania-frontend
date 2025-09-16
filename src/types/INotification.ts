export interface INotification {
  id: number;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}