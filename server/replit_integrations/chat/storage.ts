export interface IChatStorage {
  getConversation(id: number): Promise<any>;
  getAllConversations(): Promise<any[]>;
  createConversation(title: string): Promise<any>;
  deleteConversation(id: number): Promise<void>;
  getMessagesByConversation(conversationId: number): Promise<any[]>;
  createMessage(conversationId: number, role: string, content: string): Promise<any>;
}

export const chatStorage: IChatStorage = {
  async getConversation(id: number) {
    return undefined;
  },

  async getAllConversations() {
    return [];
  },

  async createConversation(title: string) {
    return { id: 1, title };
  },

  async deleteConversation(id: number) {},

  async getMessagesByConversation(conversationId: number) {
    return [];
  },

  async createMessage(conversationId: number, role: string, content: string) {
    return { id: Date.now(), conversationId, role, content };
  },
};
