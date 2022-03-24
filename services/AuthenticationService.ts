import UserDao from "../daos/UserDao";
import User from "../models/users/User";

const userDao: UserDao = UserDao.getInstance();


export const login = async (u: string, p: string) => {
    try {
        const user = await userDao.findUserByCredentials(u, p);
        if (!user) {
            throw "Unknown user";
        }
        return user;
    } catch (e) {
        return e;
    }
}

export const register = async (u: string, p: string, e: string) => {
    try {
        const user = await userDao.findUserByUsername(u);
        if (user) {
            throw 'User already exists';
        }
        return await userDao.createUser({username: u, password: p, email: e});
    } catch (e) {
        return e;
    }
}
