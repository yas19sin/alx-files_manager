import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

describe('API Endpoints', () => {
  describe('GET /status', () => {
    it('should return status of redis and db', (done) => {
      request(app)
        .get('/status')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('redis');
          expect(res.body).to.have.property('db');
          done();
        });
    });
  });

  describe('GET /stats', () => {
    it('should return stats', (done) => {
      request(app)
        .get('/stats')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('users');
          expect(res.body).to.have.property('files');
          expect(res.body.users).to.be.a('number');
          expect(res.body.files).to.be.a('number');
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const user = {
        email: 'test@example.com',
        password: 'testpassword123',
      };

      request(app)
        .post('/users')
        .send(user)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('email');
          expect(res.body.email).to.equal(user.email);
          done();
        });
    });

    it('should return error for missing email', (done) => {
      const user = {
        password: 'testpassword123',
      };

      request(app)
        .post('/users')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.error).to.equal('Missing email');
          done();
        });
    });

    it('should return error for missing password', (done) => {
      const user = {
        email: 'test2@example.com',
      };

      request(app)
        .post('/users')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.error).to.equal('Missing password');
          done();
        });
    });
  });
});
