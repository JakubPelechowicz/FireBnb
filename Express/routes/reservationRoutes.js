const express = require("express");
const router = express.Router();
const Bnb = require("../models/bnb");
const Reservation = require("../models/reservation")
const {Op} = require("sequelize");
const User = require("../models/user");
const authenticateToken = require("../middleware/jwtMiddleware");
const {validate} = require("../middleware/validateMiddleware");
const {reservationCreateValidator} = require("../middleware/validator/reservationCreateValidator");
const {reservationUpdateValidator} = require("../middleware/validator/reservationUpdateValidator");
const {reservationParamIdValidator} = require("../middleware/validator/reservationParamIdValidator");
const {reservationListValidator} = require("../middleware/validator/reservationListValidator");
const UserRoutes = require("../models/user");

async function isConflicting(start, end, bnb_id, id = null) {
    let query = {
        where: {
            bnb_id: {[Op.eq]: bnb_id},
            [Op.or]: [
                {
                    startDate: {
                        [Op.gte]: start,
                        [Op.lt]: end
                    },
                    endDate: {
                        [Op.gt]: start,
                        [Op.lte]: end
                    },
                    [Op.and]: {
                        startDate: {
                            [Op.lte]: start
                        },
                        endDate: {
                            [Op.gte]: end
                        },
                    }
                }
            ]
        }
    };

    if (id !== null) {
        query.where.id = {
            [Op.ne]: id
        }
    }

    const {count} = await Reservation.findAndCountAll(query);
    return count > 0;
}

router.post('/create', [authenticateToken, validate(reservationCreateValidator)], async (req, res) => {
    const {start_date, end_date, bnb_id} = req.body;
    const user = await User.findOne({email: req.user.email});
    const user_id = user.id;
    if (start_date > end_date) {
        res.status(400).json({message: "reservation start is later than the end"})
    }
    const bnb = await Bnb.findById(bnb_id);
    if (bnb === null) {
        res.status(404).json({message: "bnb not found"});
    }
    if (await isConflicting(start_date, end_date, bnb_id)) {
        res.status(400).json({message: "reservation date is already reserved"})
    }
    const reservation = await Reservation.create({
        startDate: start_date,
        endDate: end_date,
        bnbId: bnb_id,
        userId: user_id
    })
    res.status(200).json({message: "Reservation created", reservation});
})
router.put('/update', [authenticateToken, validate(reservationUpdateValidator)], async (req, res) => {
    const {id, start_date, end_date} = req.body;
    let reservation = await Reservation.findByPk(id);
    const user = await User.findOne({email: req.user.email});
    console.log(id, start_date, end_date, reservation, user)
    if (!reservation) {
        res.status(404).json({message: "not found"})
    }
    if (reservation.userId !== user['id']) {
        console.log(reservation.userId, user.id);
        res.status(403).json({message: "forbidden"})
    }
    if (start_date) {
        reservation.startDate = start_date;
    }
    if (end_date) {
        reservation.endDate = end_date;
    }
    if (reservation.endDate < reservation.startDate) {
        res.status(422).json({message: "reservation start is later than end"})
    }
    if (await isConflicting(reservation.startDate, reservation.endDate, reservation.bnbId, reservation.id)) {
        res.status(400).json({message: "reservation date is already reserved"})
    }
    console.log(id, start_date, end_date, reservation, user)
    await reservation.save();
    res.status(200).json({message: "Successfully updated", reservation});
})
router.get('/index/:id', [validate(reservationParamIdValidator)], async (req, res) => {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
        res.status(404).json({message: "Not Found"});
    }
    res.status(200).json({data: reservation});
})
router.get('/list', validate(reservationListValidator), async (req, res) => {
    const {start_date, end_date, bnb_id} = req.query;
    let query = {
        where: {
            bnbId: {[Op.eq]: bnb_id}
        }
    }
    if (start_date !== undefined) {
        query.where.endDate = {[Op.gte]: start_date};
    }
    if (end_date !== undefined) {
        query.where.startDate = {[Op.lte]: end_date};
    }

    const reservations = await Reservation.findAll(query);
    res.status(200).json({data: reservations});
})
router.delete('/delete/:id', [authenticateToken, validate(reservationParamIdValidator)], async (req, res) => {
    const {id} = req.params;
    const reservation = await Reservation.findByPk(id);
    if (reservation === null) {
        res.status(404).json({message: "reservation not found"})
    }
    const user = await UserRoutes.findOne({email: req.user.email});
    if (reservation.userId !== user.id) {
        res.status(403).json({message: "Forbidden"});
    }
    await reservation.destroy();
    res.status(200).json({message: "successfully deleted", reservation});
});

module.exports = router;
