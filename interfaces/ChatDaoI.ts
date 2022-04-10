import Chat from "../models/chats/Chat";

/**
 * @file Declares API for Chats related data access object methods
 */
export default interface ChatDaoI {
    userChatsUser(uid: string, uid1: string, message: Chat): Promise<Chat>;

    findAllChatsUserSent(uid: string): Promise<Chat[]>;

    findAllChatsUserReceived(uid: string): Promise<Chat[]>;

    deleteChat(cid: string): Promise<any>;

    updateChat(cid: string, message: Chat): Promise<any>;

    findAllChatsByUser(uid: string): Promise<Chat[]>;
};
