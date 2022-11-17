const router = require('express').Router();

router.use('/get_top_post', require('./get_top_post'));
router.use('/search_comment', require('./search_comment'));

module.exports = router;
