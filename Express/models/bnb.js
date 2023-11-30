const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BnbSchema = new Schema({
    space: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

const Bnb = mongoose.model('Bnb', BnbSchema);

module.exports = Bnb;