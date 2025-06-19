import { expect } from 'chai';
import dbClient from '../utils/db.js';

describe('DBClient', () => {
  before(async () => {
    // Wait for connection
    await new Promise((resolve) => {
      const checkConnection = () => {
        if (dbClient.isAlive()) {
          resolve();
        } else {
          setTimeout(checkConnection, 100);
        }
      };
      checkConnection();
    });
  });

  it('should be alive', () => {
    expect(dbClient.isAlive()).to.equal(true);
  });

  it('should return number of users', async () => {
    const nbUsers = await dbClient.nbUsers();
    expect(nbUsers).to.be.a('number');
  });

  it('should return number of files', async () => {
    const nbFiles = await dbClient.nbFiles();
    expect(nbFiles).to.be.a('number');
  });
});
