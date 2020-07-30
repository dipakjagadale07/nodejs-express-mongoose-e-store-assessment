const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const config = require('./config/config.js');
const loadDB = require('./mongoose');
const { loadUserData } = require('./seed');

const app = express();
const apiRoutes = express.Router();

const login = require('./src/routes/login.routes.js');
const categories = require('./src/routes/category.routes.js');
const products = require('./src/routes/product.routes.js');
const cart = require('./src/routes/cart.routes.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

loadDB();
loadUserData();

apiRoutes.use((req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'Unauthorized'
        });
    }
});

app.use('/api', apiRoutes);
app.use('/login', login);
app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/cart', cart);

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to E-Store application. See, choose and buy products online." });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});