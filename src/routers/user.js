const express = require('express');
const router = new express.Router();

router.post('/api/users', (req, res) => {
    res.send({ user: 'User 123' })
});

module.exports = router;