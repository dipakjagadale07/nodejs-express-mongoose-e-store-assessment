const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjIyYTUxYWU0ZTU1YTAyYjA3NjJhZjQiLCJlbWFpbCI6ImRpcGFrQGdtYWlsLmNvbSIsImlhdCI6MTU5NjEyOTU2Mn0.p6nkMDgBYZEDoIo32wpSMpvyCSOuVnlGTf2jIzaHgyY";
const productId = "5f22aa1f2589f370df30c556"

describe("Cart", () => {
    describe("POST /", () => {
        it("should add product to cart", (done) => {
            chai.request(app)
                .post('/api/cart/add/' + productId)
                .set("authorization", token)
                .send({ quantity: 25 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should get cart for a specific user", (done) => {
            chai.request(app)
                .get('/api/cart/')
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

