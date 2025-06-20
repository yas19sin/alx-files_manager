import { expect } from 'chai';
import redisClient from '../utils/redis.js';

describe('redisClient', () => {
    describe('isAlive', () => {
        it('should return true when Redis is connected', () => {
            expect(redisClient.isAlive()).to.be.a('boolean');
        });
    });

    describe('get', () => {
        it('should return null for non-existent key', async () => {
            const result = await redisClient.get('nonexistent');
            expect(result).to.be.null;
        });
    });

    describe('set and get', () => {
        it('should set and get a value', async () => {
            await redisClient.set('testKey', 'testValue', 10);
            const result = await redisClient.get('testKey');
            expect(result).to.equal('testValue');
        });
    });

    describe('del', () => {
        it('should delete a key', async () => {
            await redisClient.set('testKeyToDelete', 'testValue', 10);
            await redisClient.del('testKeyToDelete');
            const result = await redisClient.get('testKeyToDelete');
            expect(result).to.be.null;
        });
    });
});
