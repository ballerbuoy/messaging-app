export interface ChatRoomType {
  roomId: string;
  roomName: string;
  participants: string[];
  messageHistory: MessageType[];
}

export interface MessageType {
  text: string;
  timestamp: string;
  sentBy: string;
  messageId: string;
}
