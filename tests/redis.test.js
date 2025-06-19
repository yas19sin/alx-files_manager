import { expect } from 'chai';
import redisClient from '../utils/redis.js';

describe('RedisClient', () => {
  it('should be alive', () => {
    expect(redisClient.isAlive()).to.equal(true);
  });

  it('should set and get a value', async () => {
    await redisClient.set('test_key', 'test_value', 60);
    const value = await redisClient.get('test_key');
    expect(value).to.equal('test_value');
  });

  it('should delete a value', async () => {
    await redisClient.set('test_key_del', 'test_value', 60);
    await redisClient.del('test_key_del');
    const value = await redisClient.get('test_key_del');
    expect(value).to.be.null;
  });
});
