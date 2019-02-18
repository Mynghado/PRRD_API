const express = require('express');
const cors = require('cors');


const router = express();


// Automatically allow cross-origin requests
router.use(cors({ origin: true }));

router.get('/get', function (req, res) {
    res.status(200).json({
        message: "GET HI REQUEST"
    })
});

router.put('/put', function (req, res) {
    res.status(200).json({
        message: "PUT REQUEST"
    })
});

router.post('/post', function (req, res) {
    res.status(200).json({
        message: "POST REQUEST"
    })
});

router.delete('/delete', function (req, res) {
    res.status(200).json({
        message: "DELETE REQUEST"
    })
});

module.exports = router;