/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import messageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Message
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Uses MessageModel to retrieve all message documents that belong to a user from messages collection
     * @param {string} uid User's Primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesByUser = async (uid: string): Promise<Message[]> =>
        messageModel.find({$or: [{to: uid}, {from: uid}]})
            .populate("to")
            .populate("from")
            .exec();

    /**
     * Uses MessageModel to retrieve all message documents that a user received from messages collection
     * @param {string} uid User's Primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesUserReceived = async (uid: string): Promise<Message[]> =>
        messageModel.find({to: uid})
            .populate("from")
            .exec();

    /**
     * Uses MessageModel to retrieve all message documents that a user sent from messages collection
     * @param {string} uid User's Primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesUserSent = async (uid: string): Promise<Message[]> =>
        messageModel.find({from: uid})
            .populate("to")
            .exec();
    /**
     * Removes a message from the database
     * @param {string} mid Message's Primary key
     * @return Promise To be notified when message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        messageModel.deleteOne({_id: mid});

    /**
     * Updates a message from the database
     * @param {string} mid Message's Primary key
     * @param {Message} message Message object containing properties and their new values
     * @return Promise To be notified when message is updated in the database
     */
    updateMessage = async (mid: string, message: Message): Promise<any> =>
        messageModel.updateOne({_id: mid}, {$set: message});

    /**
     * Inserts a message into the database
     * @param {string} uid User's Primary key
     * @param {string} uid1 Another User's Primary key
     * @param {Message} message Message Instance to be inserted into the database
     * @return Promise To be notified when message is inserted in the database
     */
    userMessagesUser = async (uid: string, uid1: string, message: Message): Promise<Message> =>
        messageModel.create({...message, from: uid, to: uid1});

}


