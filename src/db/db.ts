import Dexie, { Table } from "dexie";

export interface Message {
  id: string;
  windowId: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
  imageUrl?: string;
}

export interface ChatWindow {
  id: string;
  provider: string;
  model: string;
  position: number;
  isSynced: boolean;
  createdAt: number;
  updatedAt: number;
}

// Define the database
class MultiChatDB extends Dexie {
  chatWindows!: Table<ChatWindow, string>;
  messages!: Table<Message, string>;

  constructor() {
    super("multiChatDB");
    this.version(1).stores({
      chatWindows: "id, provider, model, position, createdAt, updatedAt",
      messages: "id, windowId, role, timestamp, [windowId+timestamp]",
    });
  }
}

// Create and export a database instance
export const db = new MultiChatDB();

// Helper functions for common database operations
export const dbOperations = {
  // Windows
  async getAllWindows(): Promise<ChatWindow[]> {
    return await db.chatWindows.orderBy("position").toArray();
  },

  async addWindow(
    window: Omit<ChatWindow, "createdAt" | "updatedAt">
  ): Promise<string> {
    const now = Date.now();
    const id = await db.chatWindows.add({
      ...window,
      createdAt: now,
      updatedAt: now,
    });
    return id.toString();
  },

  async updateWindow(
    id: string,
    changes: Partial<Omit<ChatWindow, "id" | "createdAt">>
  ): Promise<void> {
    await db.chatWindows.update(id, {
      ...changes,
      updatedAt: Date.now(),
    });
  },

  async removeWindow(id: string): Promise<void> {
    // Transaction to remove window and all associated messages
    await db.transaction("rw", [db.chatWindows, db.messages], async () => {
      await db.messages.where("windowId").equals(id).delete();
      await db.chatWindows.delete(id);
    });
  },

  // Messages
  async getMessages(windowId: string): Promise<Message[]> {
    return await db.messages
      .where("windowId")
      .equals(windowId)
      .reverse() // Latest first
      .sortBy("timestamp");
  },

  async addMessage(message: Message): Promise<string> {
    const id = await db.messages.add(message);
    await db.chatWindows.update(message.windowId, {
      updatedAt: Date.now(),
    });
    return id.toString();
  },

  async clearWindowMessages(windowId: string): Promise<void> {
    await db.messages.where("windowId").equals(windowId).delete();
    await db.chatWindows.update(windowId, {
      updatedAt: Date.now(),
    });
  },
};
