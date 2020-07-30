const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe("Login", () => {
    describe("Post /", () => {
        it("should user login", (done) => {
            chai.request(app)
                .post('/login')
                .send({ email: "dipak@gmail.com", password: "secret" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

