import Queue from 'bull';
import imageThumbnail from 'image-thumbnail';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import dbClient from './utils/db.js';

const fileQueue = new Queue('fileQueue');
const userQueue = new Queue('userQueue');

fileQueue.process(async (job) => {
  const { fileId, userId } = job.data;

  if (!fileId) {
    throw new Error('Missing fileId');
  }

  if (!userId) {
    throw new Error('Missing userId');
  }

  const db = dbClient.client.db(dbClient.dbName);
  const files = db.collection('files');
  const file = await files.findOne({
    _id: ObjectId(fileId),
    userId: ObjectId(userId),
  });

  if (!file) {
    throw new Error('File not found');
  }

  const sizes = [500, 250, 100];
  const promises = sizes.map(async (size) => {
    try {
      const thumbnail = await imageThumbnail(file.localPath, { width: size });
      fs.writeFileSync(`${file.localPath}_${size}`, thumbnail);
    } catch (error) {
      console.error(`Error generating thumbnail ${size}:`, error);
    }
  });

  await Promise.all(promises);
});

userQueue.process(async (job) => {
  const { userId } = job.data;

  if (!userId) {
    throw new Error('Missing userId');
  }

  const db = dbClient.client.db(dbClient.dbName);
  const users = db.collection('users');
  const user = await users.findOne({ _id: ObjectId(userId) });

  if (!user) {
    throw new Error('User not found');
  }

  console.log(`Welcome ${user.email}!`);
});

console.log('Worker started');
export { fileQueue, userQueue };
