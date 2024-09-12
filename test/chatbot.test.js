import { expect } from 'chai';
import request from 'supertest';
import app from '../index.js';




describe('GET Response Test /chatbot/random', function() {
    it('should return a random response from the chatbot', function(done) {
        request(app)
            .get('/api/chatbot/random')
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});



// ! TEST to check the randomness of the response, Have to create a workaround, it's not entirely useful, Have to take help from chat gpt.

describe('Randomness Test', function() {
    this.timeout(5000)
    it('should return different responses over multiple requests', function(done) {
        let responses = [];
        let requestCount = 10;

        function makeRequest(count) {
            if (count === 0) {
                const uniqueResponses = [...new Set(responses)];
                expect(uniqueResponses.length).to.be.above(1);
                done();
                return;
            }

            request(app)
                .get('/api/chatbot/random')
                .end(function(err, res) {
                    responses.push(res.body.message);
                    makeRequest(count - 1);
                });
        }

        makeRequest(requestCount);
    });
});
