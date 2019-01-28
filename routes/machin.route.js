const express = require('express');
const router = express();
const cors = require('cors');

// Automatically allow cross-origin requests
router.use(cors({ origin: true }));

router.get('/', function (req, res) {
    res.status(200).json({
        message: "GET REQUEST"
    })
});

router.put('/', function (req, res) {
    res.status(200).json({
        message: "PUT REQUEST"
    })
});

router.post('/', function (req, res) {
    res.status(200).json({
        message: "POST REQUEST"
    })
});

router.delete('/', function (req, res) {
    res.status(200).json({
        message: "DELETE REQUEST"
    })
});

module.exports = router;