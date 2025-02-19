import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const Config = {
    endpoint: '',
    platform: '',
    projectId: '',
    databaseId: '',
    userCollectionId: '',
    systemNoticeId: '',
    notificationsId : '',
    storageId: '',
}

const client = new Client();

client
    .setEndpoint(Config.endpoint)
    .setProject(Config.projectId)
    .setPlatform(Config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            Config.databaseId,
            Config.userCollectionId,
            ID.unique(),
            {   
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;
    
    }catch (error){
        console.log(error);
        throw new Error(error);
    }
}


export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        
    }catch (error){
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error;
        console.log(currentUser)
        return currentUser.documents[0];
    }catch (error){
        console.log(error);
    }
}

export const sendRecoveryEmail = async (email) => {
    try {
      const response = await account.createRecovery(email, "http://localhost:8081");
      console.log('Recovery email sent:', response);
      return response;
    } catch (error) {
      console.error('Error sending recovery email:', error);
    }
};

export const logout = async () => {
    try {
        await account.get();
        await account.deleteSession('current');
    } catch (error) {
        console.log('Error during logout:', error);
    }
}

export const getSystemNotice = async () => {
    try{
        const notices = await databases.listDocuments(
            Config.databaseId,
            Config.systemNoticeId,
            [Query.orderDesc('$createdAt', Query.limit(20))]
        );
        return notices.documents;
    }catch (error){
        throw new Error(error);
    }
}

export const updateSignature = async (newSignature) => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        const response = await databases.updateDocument(
            Config.databaseId,
            Config.userCollectionId,
            currentUser.documents[0].$id,
            {signature : newSignature}
        )
        return response;
    } catch (error) {
        console.error('Error updating signature:', error);
    }
}


export const getFilePreview = async (fileId) => {
    let fileUrl;
    try {
        fileUrl = storage.getFilePreview(Config.storageId, fileId, 200, 200, 'top', 100);
        if (!fileUrl){
            throw new Error(error);
        }
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const uploadFile = async (file) => {
    if (!file){
        return;
    }

    const { mimeType, ...rest } = file;
    const asset = { type : mimeType, ...rest };
    
    try {
        const uploadedFile = await storage.createFile(
            Config.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id);
        return fileUrl;
    } catch (error) {
        throw Error(error);
    }
}

export const uploadUserImage = async (uploadImage) => {
    try{
        const [imageUrl] = await Promise.all([
            uploadFile(uploadImage)
        ])

        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        const response = await databases.updateDocument(
            Config.databaseId,
            Config.userCollectionId,
            currentUser.documents[0].$id,
            {avatar : imageUrl}
        )

        console.log(imageUrl);

        return imageUrl;

    }catch (error){
        throw new Error(error);
    }
}

export const getAllNotifications = async () => {
    try{
        const notifications = await databases.listDocuments(
            Config.databaseId,
            Config.notificationsId,
            [Query.orderDesc('$createdAt', Query.limit(20))]
        );
        return notifications.documents;
    }catch (error){
        throw new Error(error);
    }
}

export const createUserNotification = async(creator, notificationTitle, notificationContent) => {
    try {
        const result = await databases.createDocument(
            Config.databaseId,
            Config.notificationsId,
            ID.unique(),
            {
                senderId: creator,
                title: notificationTitle,
                content: notificationContent
            }
        )
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUser = async (userId) => {
    try {
        const user = await databases.getDocument(
            Config.databaseId,
            Config.userCollectionId,
            userId
        );
        if (!user) throw Error;
        return user;
    }catch (error){
        console.log(error);
    }
}