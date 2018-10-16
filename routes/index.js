const express = require('express');
const router = express.Router();

// 메인 페이지
router.get('/', (req, res, next) => {
  // Pug 페이지 렌더링
  res.render('main', {
    title: 'y9Bird',
    user: null,
    twits: [],
    loginError: req.flash('loginError'),
  });
});


module.exports = router;
