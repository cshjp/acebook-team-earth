//instead of authenticates.js> file: api/routes/users.js
//this file defines the routes related to user operations(eg.signup,login)

const express = require("express");
const router = express.Router();


const UsersController  = require("../controllers/users"); 
//route for user signup
router.post('/', UsersController.signupUser); // should be authController.signupUser


// const express = require("express");
// const router = express.Router();

// const UsersController = require("../controllers/users");

// router.post("/", UsersController.Create);
// router.get("/:user_Id/username", UsersController.GetUsername);

module.exports = router;

//router.post("/", UsersController.Create);<previous one

//pw is hashed again because the hashed version received from the client side 
//might be intercepted and used for replay attacks.
//hashed again at the server-side before storing the pw, adds an additional layer of security
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //validation and error handling code here
        //
        //findOne()method is a mongodb operation, that finds one doc per the condition
        //if multiple documents satisfy the condition, it returns the first one it finds
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save()

        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation and error handling here
        //
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password, Please Try again!'});
        }
        //compare the provided pw with stored hashed one
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password, Please Try again!'});
        }

        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Invalid server error' });
    }
});

module.exports = router;