export interface UserInfo {
  username: string;
  password: string;
  avatar: string;
  personalChatsSubscribed: ChatInfo[];
  groupChatsSubscribed: ChatInfo[];
}

export interface ChatInfo {
  roomId: string;
  roomName: string;
}
