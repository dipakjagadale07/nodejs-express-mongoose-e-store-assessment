const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const app = require('../server');
const User = require('../src/models/user.model');
const Category = require('../src/models/category.model');
const Product = require('../src/models/product.model');
const Cart = require('../src/models/cart.model');

chai.use(chaiHttp);
chai.should();
var token;
var productId;

describe("Cart", () => {
    before(async () => {
        await User.remove({});
        await Category.remove({});
        await Product.remove({});
        await Cart.remove({});

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

        var product = new Product({
            name: "UCB Formal Shirt",
            category: newlyAddedCategory1._id,
            description: "Formal shirt for office use",
            price: 2500,
            make: new Date()
        });
        let newlyAddedProduct = await product.save();
        productId = newlyAddedProduct._id;
    });

    after(async () => {
        await User.remove({});
        await Category.remove({});
        await Product.remove({});
        await Cart.remove({});
    });
    describe("POST /", () => {
        it("should add product to cart", (done) => {
            chai.request(app)
                .post('/api/cart/add/' + productId)
                .set("authorization", token)
                .send({ quantity: 5 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe("GET /", () => {
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

