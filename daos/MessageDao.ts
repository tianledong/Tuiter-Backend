import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import messageModel from "../mongoose/messages/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    findAllMessagesByUser = async (uid: string): Promise<Message[]> =>
        messageModel.find({$or: [{to: uid}, {from: uid}]})
            .populate("to")
            .populate("from")
            .exec();

    findAllMessagesUserReceived = async (uid: string): Promise<Message[]> =>
        messageModel.find({to: uid})
            .populate("to")
            .populate("from")
            .exec();

    findAllMessagesUserSent = async (uid: string): Promise<Message[]> =>
        messageModel.find({from: uid})
            .populate("to")
            .populate("from")
            .exec();

    deleteMessage = async (mid: string): Promise<any> =>
        messageModel.deleteOne({_id: mid});

    updateMessage = async (mid: string, message: Message): Promise<any> =>
        messageModel.updateOne({_id: mid}, {$set: message});

    userMessagesUser = async (uid: string, uid1: string, message: string): Promise<Message> =>
        messageModel.create({from: uid, to: uid1, message: message});

}


