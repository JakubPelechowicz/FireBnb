const express = require("express");
const Bnb = require("../models/bnb");
const User = require("../models/user");
const router = express.Router();
const authenticateToken = require("../middleware/jwtMiddleware");
const {bnbListValidator} = require("../middleware/validator/bnbListValidator");
const {bnbUpdateValidator} = require("../middleware/validator/bnbUpdateValidator");
const {bnbParamIdValidator} = require("../middleware/validator/bnbParamIdValidator");
const {validate} = require("../middleware/validateMiddleware");
router.get('/index/:id', [validate(bnbParamIdValidator)], async (req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({error: 'ID parameter is required'});
    }

    const bnb = await Bnb.findById(id);

    if (!bnb) {
        return res.status(404).json({error: 'BnB not found'});
    }

    res.json({bnb});

});
router.post('/create', [authenticateToken], async (req, res) => {
    const {space, cost, address} = req.body;

    const user = await User.findOne({email: req.user.email});

    const user_id = user.id;

    if (!space || !cost || !address) {

        return res.status(400).json({error: 'Please provide space, cost and address'});
    }

    const newBnB = await Bnb.create({user_id, space, cost, address});

    res.status(201).json({message: 'BnB created successfully', newBnB});
});
router.get('/list', [validate(bnbListValidator)], async (req, res) => {
    const {
        max_space, min_space, user_id, address_like, max_cost, min_cost
    } = req.query;
    const query = Bnb.find();

    if (max_space !== undefined) {
        query.where('space').lt(max_space);
    }
    if (min_space !== undefined) {
        query.where('space').gt(min_space);
    }
    if (user_id !== undefined) {
        query.where('user_id').equals(user_id);
    }
    if (address_like !== undefined) {
        query.where('address').regex(`(?i).*${address_like}.*(?-i)`);
    }
    if (max_cost !== undefined) {
        query.where('cost').lt(max_cost);
    }
    if (min_cost !== undefined) {
        query.where('cost').gt(min_cost);
    }
    const bnbs = await query.exec();
    res.status(200).json(bnbs);
});
router.put('/update', [authenticateToken, validate(bnbUpdateValidator)], async (req, res) => {
    let update = {};
    const {space, cost, address} = req.body;
    if (space !== undefined) {
        update.space = space;
    }
    if (cost !== undefined) {
        update.cost = cost;
    }
    if (address !== undefined) {
        update.address = address;
    }
    const bnb = await Bnb.findByIdAndUpdate(req.body.id, update);
    res.status(200).json({message: "BnB updated successfully", bnb})
});
router.delete('/delete/:id', [authenticateToken, validate(bnbParamIdValidator)], async (req, res) => {
    const deletedBnB = await Bnb.findByIdAndDelete(req.params.id);

    if (!deletedBnB) {
        return res.status(404).json({error: 'BnB not found'});
    }

    res.json({message: 'BnB deleted successfully', deletedBnB});
});

module.exports = router;