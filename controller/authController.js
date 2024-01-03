const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
    register: async (req,res) => {
        const { name, email, password}  = req.body;
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassowrd = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashPassowrd,
        })

        try {
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY);
            res.status(201).json({token});
        }catch (error) {
            res.status(500).json(`Internal Server Error: ${error}`);
        }
    },

    login: async (req,res) => {
        const { email, password} = req.body;
        try {
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json("User not found");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json("Invalid credentials");
            }

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
            res.json({token, user: {id: user._id, name: user.name, email: user.email}});
        } catch(error) {
            res.status(500).json(`Internal Server Error: ${error}`);
        }
    },


    validateToken: async (req,res) => {
        console.log(req.headers)
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token === null){
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            return res.status(200).json(true);
        })
    },

}

module.exports = authController;