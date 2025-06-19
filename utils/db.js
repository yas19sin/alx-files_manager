import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = database;
    this.connected = false;
    
    this.client.connect()
      .then(() => {
        this.connected = true;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        this.connected = false;
      });
  }

  isAlive() {
    return this.connected && this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    if (!this.connected) return 0;
    try {
      const db = this.client.db(this.dbName);
      return await db.collection('users').countDocuments();
    } catch (error) {
      console.error('Error counting users:', error.message);
      return 0;
    }
  }

  async nbFiles() {
    if (!this.connected) return 0;
    try {
      const db = this.client.db(this.dbName);
      return await db.collection('files').countDocuments();
    } catch (error) {
      console.error('Error counting files:', error.message);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
