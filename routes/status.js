const { Router } = require('express');

const router = Router();

router.get('/status', (req, res) => res.status(200).json({ data: { message: 'Running' } }));

module.exports = router;
