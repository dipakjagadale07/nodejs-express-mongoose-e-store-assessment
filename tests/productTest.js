const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const app = require('../server');
const User = require('../src/models/user.model');
const Category = require('../src/models/category.model');
const Product = require('../src/models/product.model');

chai.use(chaiHttp);
chai.should();
var token;
var categoryId;

describe("Products", () => {
    before(async () => {
        await User.remove({});
        await Category.remove({});
        await Product.remove({});

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
        let newlyAddedCategory1 = await category1.save();
        var category2 = new Category({
            name: "Mobile",
            type: "electronics"
        });
        let newlyAddedCategory2 = await category2.save();
        categoryId = newlyAddedCategory2._id;

        var product1 = new Product({
            name: "UCB Formal Shirt",
            category: newlyAddedCategory1._id,
            description: "Formal shirt for office use",
            price: 2500,
            make: new Date()
        });
        await product1.save();
        var product2 = new Product({
            name: "Samsung M30S",
            category: newlyAddedCategory2._id,
            description: "Mobile",
            price: 17000,
            make: new Date()
        });
        await product2.save();

    });

    after(async () => {
        await User.remove({});
        await Category.remove({});
        await Product.remove({});
    });

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

