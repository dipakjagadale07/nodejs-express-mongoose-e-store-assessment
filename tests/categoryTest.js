const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const app = require('../server');
const User = require('../src/models/user.model');
const Category = require('../src/models/category.model');

chai.use(chaiHttp);
chai.should();
var token;

describe("Categories", () => {

    before(async () => {
        await User.remove({});
        await Category.remove({});

        var password = "secret"
        var password_hash = await bcrypt.hash(password, 8);
        var newUser = new User({
            firstName: "Test",
            lastName: "User",
            email: "a@b.com",
            password: password_hash
        });
        await newUser.save();

        let loginRes = await chai.request(app)
            .post('/login')
            .send({ email: "a@b.com", password: "secret" });
        token = loginRes.body.token;

        var category1 = new Category({
            name: "Shirt",
            type: "clothing"
        });
        await category1.save();
        var category2 = new Category({
            name: "Mobile",
            type: "electronics"
        });
        await category2.save();

    });

    after(async () => {
        await User.remove({});
        await Category.remove({});
    });

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

