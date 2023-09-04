const express = require("express")
const router = express.Router()

router.route("/:id").get((req, res) => {
    res.send(`Welcome User ${req.user.username}\nGet User with ID ${req.params.id}`);
}).put((req, res) => {
    res.send(`Welcome User ${req.user.username}\nPut User with ID ${req.params.id}`);
}).delete((req, res) => {
    res.send(`Welcome User ${req.user.username}\nDelete User with ID ${req.params.id}`);
});


router.get("/private", (req, res) => {
    const {user} = req;
    res.status(200).send(`Welcome ${user.username}`);

});

module.exports = router;