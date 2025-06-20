import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('api endpoints', () => {
    const baseUrl = 'http://localhost:5001';

    describe('status endpoint', () => {
        it('should return status of Redis and DB', () => new Promise((done) => {
            chai.request(baseUrl)
                .get('/status')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('redis');
                    expect(res.body).to.have.property('db');
                    done();
                });
        }));
    });

    describe('stats endpoint', () => {
        it('should return user and file counts', () => new Promise((done) => {
            chai.request(baseUrl)
                .get('/stats')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('users');
                    expect(res.body).to.have.property('files');
                    done();
                });
        }));
    });
});
