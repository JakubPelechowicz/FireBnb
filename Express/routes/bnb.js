const express = require("express");
const Bnb = require("../models/bnb");
const authenticateToken = require("../middleware/jwt");
const User = require("../models/user");
const {bnbListValidator} = require("../middleware/bnbListValidator");
const router = express.Router();

router.get('/index/:id', async (req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({error: 'ID parameter is required'});
    }

    const bnb = await Bnb.findById(id);

    if (!bnb) {
        return res.status(404).json({error: 'BnB not found'});
    }

    res.json({bnb});

})
router.post('/create', authenticateToken, async (req, res) => {
    const {space, cost, address} = req.body;

    const user = await User.findOne({email: req.user.email});

    const user_id = user.id;

    if (!space || !cost || !address) {

        return res.status(400).json({error: 'Please provide space, cost and address'});
    }

    const newBnB = await Bnb.create({user_id, space, cost, address});

    res.status(201).json({message: 'BnB created successfully', newBnB});
});
router.get('/list', [bnbListValidator], async (req, res) => {
    const {
        max_space, min_space, user_id, address_like, max_cost, min_cost
    } = req.body;
    console.log(max_space, min_space, user_id, address_like, max_cost, min_cost);
    const query = Bnb.find();
    if (max_space) {
        query.where('space').lt(max_space);
        console.log("jesli to ostatni w życiu dzien");
    }
    if (min_space) {
        query.where('space').gt(min_space);
        console.log("jesli jutro nie ma być na pewno");
    }
    if (user_id) {
        query.where('user_id').equals(user_id);
    }
    if (address_like) {
        query.where('address').regex(`(?i).*${address_like}.*(?-i)`);
    }
    if (max_cost) {
        query.where('cost').lt(max_cost);
    }
    if (min_cost) {
        query.where('space').lt(min_cost);
    }
    bnbs = await query.exec();
    res.status(200).json(bnbs);
})
module.exports = router;