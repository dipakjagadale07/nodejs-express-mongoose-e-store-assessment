const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjIyYTUxYWU0ZTU1YTAyYjA3NjJhZjQiLCJlbWFpbCI6ImRpcGFrQGdtYWlsLmNvbSIsImlhdCI6MTU5NjEyOTU2Mn0.p6nkMDgBYZEDoIo32wpSMpvyCSOuVnlGTf2jIzaHgyY";

describe("Categories", () => {
    describe("GET /", () => {
        it("should get all categories", (done) => {
            chai.request(app)
                .get('/api/categories')
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

