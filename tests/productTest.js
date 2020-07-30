const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjIyYTUxYWU0ZTU1YTAyYjA3NjJhZjQiLCJlbWFpbCI6ImRpcGFrQGdtYWlsLmNvbSIsImlhdCI6MTU5NjEyOTU2Mn0.p6nkMDgBYZEDoIo32wpSMpvyCSOuVnlGTf2jIzaHgyY";
const categoryId = "5f22a74d2589f370df30c4b7";

describe("Products", () => {
    describe("GET /", () => {
        it("should list all products", (done) => {
            chai.request(app)
                .get('/api/products')
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should list all products of a specific category", (done) => {
            chai.request(app)
                .get('/api/products/' + categoryId)
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

