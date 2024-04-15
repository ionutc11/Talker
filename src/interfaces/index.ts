export interface ISpacing {
    padding?: string;
    margin?: string;
}

export interface IUser {
    username: string;
    id: string;
}

export interface IConnectedUsersRes {
    users: IUser[];
    onlineUsers: number;
}

export interface IMessage {
    from: string;
    to: string;
    message: string;
}

export interface IChatListRes {
    users: IUser[];
    lastMessage: IMessage;
}

export interface ILastChat {
    user: IUser;
    lastMessage: IMessage;
}

export interface INewMessageRes {
    messages: IMessage[];
    newMessage: IMessage;
}