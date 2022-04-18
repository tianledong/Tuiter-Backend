/**
 * @file Implements DAO managing data storage of chats. Uses mongoose ChatModel
 * to integrate with MongoDB
 */
import ChatDaoI from "../interfaces/ChatDaoI";
import Chat from "../models/chats/Chat";
import chatModel from "../mongoose/chats/ChatModel";
import TuitModel from "../mongoose/tuits/TuitModel";

/**
 * @class ChatDao Implements Data Access Object managing data storage
 * of Chat
 * @property {ChatDao} chatDao Private single instance of ChatDao
 */
export default class ChatDao implements ChatDaoI {
    private static chatDao: ChatDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns ChatDao
     */
    public static getInstance = (): ChatDao => {
        if (ChatDao.chatDao === null) {
            ChatDao.chatDao = new ChatDao();
        }
        return ChatDao.chatDao;
    }

    private constructor() {
    }

    /**
     * Uses MessageModel to retrieve all chat documents that belong to a user from messages collection
     * @param {string} uid User's Primary key
     * @returns Promise To be notified when the chats are retrieved from
     * database
     */
    findAllChatsByUser = async (uid: string): Promise<Chat[]> =>
        chatModel.find({$or: [{sentTo: uid}, {sentBy: uid}]})
            .populate("sentTo")
            .populate("sentBy")
            .exec();

    /**
     * Uses ChatModel to retrieve all chat documents that a user received from chats collection
     * @param {string} uid User's Primary key
     * @returns Promise To be notified when the chats are retrieved from
     * database
     */
    findAllChatsUserReceived = async (uid: string): Promise<Chat[]> =>
        chatModel.find({sentTo: uid})
            .populate("sentBy")
            .exec();

    /**
     * Uses ChatModel to retrieve all chat documents that a user sent from chats collection
     * @param {string} uid User's Primary key
     * @returns Promise To be notified when the chats are retrieved from
     * database
     */
    findAllChatsUserSent = async (uid: string): Promise<Chat[]> =>
        chatModel.find({sentBy: uid})
            .populate("sentTo")
            .exec();
    /**
     * Removes a chat from the database
     * @param {string} cid Chat's Primary key
     * @return Promise To be notified when chat is removed from the database
     */
    deleteChat = async (cid: string): Promise<any> =>
        chatModel.deleteOne({_id: cid});

    /**
     * Updates a chat from the database
     * @param {string} cid Chat's Primary key
     * @param {Chat} message Chat object containing properties and their new values
     * @return Promise To be notified when chat is updated in the database
     */
    updateChat = async (cid: string, message: Chat): Promise<any> =>
        chatModel.updateOne({_id: cid}, {$set: message});

    /**
     * Inserts a chat into the database
     * @param {string} uid User's Primary key
     * @param {string} uid1 Another User's Primary key
     * @param {Chat} message Chat Instance to be inserted into the database
     * @return Promise To be notified when chat is inserted in the database
     */
    userChatsUser = async (uid: string, uid1: string, message: Chat): Promise<Chat> =>
        chatModel.create({...message, sentBy: uid, sentTo: uid1});

    /**
     * Fetch all chat messages for users
     * @param {string} uid User's primary key
     * @param {string} uid1 Another user's primary key
     */
    findChatForUsers = async (uid: string, uid1: string): Promise<any> =>
        chatModel.find({$or: [{sentTo: uid, sentBy: uid1}, {sentTo: uid1, sentBy: uid}]})
            .exec();

    /**
     * Fetch the total amount of unread messages
     * @param {string} uid User's primary key
     */
    countTotalUnreadMessage = async (uid: string): Promise<any> =>
        chatModel.count({sentTo: uid, isRead: false});

    /**
     * Fetch the total amount of unread messages for both users
     * @param {string} uid User's primary key
     * @param {string} uid1 Another user's primary key
     */
    countTotalUnreadMessageForUsers = async (uid: string, uid1: string): Promise<any> =>
        chatModel.count({sentBy: uid1, sentTo: uid, isRead: false});

    /**
     * Update a sent chat message
     * @param {string} uid User's primary key
     * @param {string} uid1 Another user's primary key
     */
    updateRead = async (uid: string, uid1: string): Promise<any> =>
        chatModel.updateMany({sentBy: uid1, sentTo: uid},
            {$set: {isRead: true}});
}


