export interface Message {
    id:number
    senderId: string
    senderName: string
    receiverId: string
    receiverName: string
    content: string
    dateRead: Date
    sentAt: Date
  }
  