import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    userMessagesUser(uid: string, uid1: string, message: string): Promise<Message>;

    findAllMessagesUserSent(uid: string): Promise<Message[]>;

    findAllMessagesUserReceived(uid: string): Promise<Message[]>;

    deleteMessage(mid: string): Promise<any>;

    updateMessage(mid: string, message: Message): Promise<any>;

    findAllMessagesByUser(uid: string): Promise<Message[]>;


};