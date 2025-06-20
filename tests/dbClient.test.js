import { expect } from 'chai';
import dbClient from '../utils/db.js';

describe('dbClient', () => {
    before(async () => {
        // Wait for DB connection
        const waitForConnection = async (retries = 0) => {
            if (retries >= 10) return;
            if (!dbClient.isAlive()) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                await waitForConnection(retries + 1);
            }
        };
        await waitForConnection();
    });

    describe('isAlive', () => {
        it('should return true when MongoDB is connected', () => {
            expect(dbClient.isAlive()).to.be.true;
        });
    });

    describe('nbUsers', () => {
        it('should return a number', async () => {
            const count = await dbClient.nbUsers();
            expect(count).to.be.a('number');
            expect(count).to.be.at.least(0);
        });
    });

    describe('nbFiles', () => {
        it('should return a number', async () => {
            const count = await dbClient.nbFiles();
            expect(count).to.be.a('number');
            expect(count).to.be.at.least(0);
        });
    });
});
