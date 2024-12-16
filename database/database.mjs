import { join } from 'path';
import { Low, JSONFile } from 'lowdb';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
db.data ||= { users: [] };

export const getDb = async () => {
    await db.read();
    return db;
};

export const Search = async (id) => {
    await db.read();
    return db.data.users.find((user) => user.id === id);
};

export const addUser = async (user) => {
    await db.read();
    db.data.users.push(user);
    await db.write(); 
    return user; 
};

export const isUserExist = async (id) => {
    await db.read();
    if (db.data.users.find((user) => user.id === id)===undefined){
        return false;
    }
    else {
        return true;
    }
};

export const updateUserName = async (id, newName) => {
    await db.read();
    const user = db.data.users.find((user) => user.id === id);
    if (user) {
        user.name = newName;
        await db.write();
    } else {
        console.error(`User with ID ${id} not found.`);
    }
};

export const updateUserWallet = async (id , change) => {
    await db.read();
    const user = db.data.users.find((user) => user.id === id);
    if (user) {
        user.wallet += change;
        await db.write();
    } else {
        console.error(`User with ID ${id} not found.`);
    }
}

export const updateUserRelationship = async (id , newRealtionship) => {
    await db.read();
    const user = db.data.users.find((user) => user.id === id);
    if (user) {
        user.relationship = newRealtionship;
        await db.write();
    } else {
        console.error(`User with ID ${id} not found.`);
    }
}

export const updateUserGender = async (id , newGender) => {
    await db.read();
    const user = db.data.users.find((user) => user.id === id);
    if (user) {
        user.gender = newGender;
        await db.write();
    } else {
        console.error(`User with ID ${id} not found.`);
    }
}

export const updateUserBio = async (id , newBio) => {
    await db.read();
    const user = db.data.users.find((user) => user.id === id);
    if (user) {
        user.bio = newBio;
        await db.write();
    } else {
        console.error(`User with ID ${id} not found.`);
    }
}