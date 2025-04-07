import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { dbOperations } from "@/lib/db";
import type { ChatWindow, Message } from "@/lib/db";

interface ChatState {
  windows: ChatWindow[];
  messages: Record<string, Message[]>;
  loadingWindows: boolean;
  syncedMode: boolean;

  // Actions
  initializeStore: () => Promise<void>;
  addWindow: (provider: string, model: string) => Promise<string>;
  removeWindow: (id: string) => Promise<void>;
  clearHistory: (id: string) => Promise<void>;
  toggleSyncWindow: (id: string) => Promise<void>;
  toggleSyncAll: () => Promise<void>;
  swapWindowPositions: (id1: string, id2: string) => Promise<void>;
  sendMessage: (content: string, imageUrl?: string) => Promise<void>;
  addAssistantMessage: (windowId: string, content: string) => Promise<void>;
  loadMessages: (windowId: string) => Promise<void>;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  windows: [],
  messages: {},
  loadingWindows: true,
  syncedMode: false,

  initializeStore: async () => {
    set({ loadingWindows: true });
    try {
      const windows = await dbOperations.getAllWindows();

      // Initialize message cache
      const messageCache: Record<string, Message[]> = {};
      for (const window of windows) {
        const msgs = await dbOperations.getMessages(window.id);
        messageCache[window.id] = msgs;
      }

      set({
        windows,
        messages: messageCache,
        loadingWindows: false,
      });
    } catch (error) {
      console.error("Error initializing store:", error);
      set({ loadingWindows: false });
    }
  },

  addWindow: async (provider, model) => {
    const id = uuidv4();
    const { windows } = get();

    try {
      await dbOperations.addWindow({
        id,
        provider,
        model,
        position: windows.length,
        isSynced: get().syncedMode,
      });

      const allWindows = await dbOperations.getAllWindows();

      set((state) => ({
        windows: allWindows,
        messages: { ...state.messages, [id]: [] },
      }));

      return id;
    } catch (error) {
      console.error("Error adding window:", error);
      throw error;
    }
  },

  removeWindow: async (id) => {
    try {
      await dbOperations.removeWindow(id);

      // Update positions for remaining windows
      const remainingWindows = get().windows.filter((w) => w.id !== id);
      for (let i = 0; i < remainingWindows.length; i++) {
        await dbOperations.updateWindow(remainingWindows[i].id, {
          position: i,
        });
      }

      // Get refreshed windows from DB
      const allWindows = await dbOperations.getAllWindows();

      set((state) => {
        const { [id]: _, ...restMessages } = state.messages;
        return {
          windows: allWindows,
          messages: restMessages,
        };
      });
    } catch (error) {
      console.error("Error removing window:", error);
    }
  },

  clearHistory: async (id) => {
    try {
      await dbOperations.clearWindowMessages(id);

      set((state) => ({
        messages: { ...state.messages, [id]: [] },
      }));
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  },

  toggleSyncWindow: async (id) => {
    try {
      const window = get().windows.find((w) => w.id === id);
      if (window) {
        const newSyncState = !window.isSynced;
        await dbOperations.updateWindow(id, { isSynced: newSyncState });

        const allWindows = await dbOperations.getAllWindows();
        set({ windows: allWindows });
      }
    } catch (error) {
      console.error("Error toggling sync:", error);
    }
  },

  toggleSyncAll: async () => {
    try {
      const newSyncedMode = !get().syncedMode;

      // Update all windows
      for (const window of get().windows) {
        await dbOperations.updateWindow(window.id, { isSynced: newSyncedMode });
      }

      const allWindows = await dbOperations.getAllWindows();
      set({
        syncedMode: newSyncedMode,
        windows: allWindows,
      });
    } catch (error) {
      console.error("Error toggling sync all:", error);
    }
  },

  swapWindowPositions: async (id1, id2) => {
    try {
      const { windows } = get();
      const window1 = windows.find((w) => w.id === id1);
      const window2 = windows.find((w) => w.id === id2);

      if (window1 && window2) {
        const pos1 = window1.position;
        const pos2 = window2.position;

        await dbOperations.updateWindow(id1, { position: pos2 });
        await dbOperations.updateWindow(id2, { position: pos1 });

        const allWindows = await dbOperations.getAllWindows();
        set({ windows: allWindows });
      }
    } catch (error) {
      console.error("Error swapping positions:", error);
    }
  },

  sendMessage: async (content, imageUrl) => {
    if (!content.trim() && !imageUrl) return;

    try {
      const { windows, syncedMode } = get();
      const targetWindows = syncedMode
        ? windows
        : windows.filter((w) => w.isSynced);

      if (targetWindows.length === 0) {
        return; // No windows to send to
      }

      const messagePromises = targetWindows.map(async (window) => {
        const message: Message = {
          id: uuidv4(),
          windowId: window.id,
          content,
          role: "user",
          timestamp: Date.now(),
          imageUrl,
        };

        await dbOperations.addMessage(message);

        return { windowId: window.id, message };
      });

      const results = await Promise.all(messagePromises);

      set((state) => {
        const newMessages = { ...state.messages };

        for (const { windowId, message } of results) {
          newMessages[windowId] = [...(newMessages[windowId] || []), message];
        }

        return { messages: newMessages };
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },

  addAssistantMessage: async (windowId, content) => {
    try {
      const message: Message = {
        id: uuidv4(),
        windowId,
        content,
        role: "assistant",
        timestamp: Date.now(),
      };

      await dbOperations.addMessage(message);

      set((state) => ({
        messages: {
          ...state.messages,
          [windowId]: [...(state.messages[windowId] || []), message],
        },
      }));
    } catch (error) {
      console.error("Error adding assistant message:", error);
    }
  },

  loadMessages: async (windowId) => {
    try {
      const messages = await dbOperations.getMessages(windowId);

      set((state) => ({
        messages: {
          ...state.messages,
          [windowId]: messages,
        },
      }));
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  },
}));
