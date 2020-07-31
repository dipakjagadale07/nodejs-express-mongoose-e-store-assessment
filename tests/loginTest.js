const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const app = require('../server');
const User = require('../src/models/user.model');

chai.use(chaiHttp);
chai.should();

describe("Login", () => {
    describe("Post /", () => {

        before(async () => {
            await User.remove({});

            var password = "secret"
            var password_hash = await bcrypt.hash(password, 8);

            var newUser = new User({
                firstName: "Test",
                lastName: "User",
                email: "a@b.com",
                password: password_hash
            });

            await newUser.save();
        });

        after(async () => {
            await User.remove({});
        });

        it("should user login", (done) => {
            chai.request(app)
                .post('/login')
                .send({ email: "a@b.com", password: "secret" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

