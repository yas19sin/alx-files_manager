import Queue from 'bull';

// Create queues
const fileQueue = new Queue('fileQueue');
const userQueue = new Queue('userQueue');

export { fileQueue as default, userQueue };
