const express = require('express');
const router = express.Router();

// 메인 페이지
router.get('/', (req, res, next) => {
  // Pug 페이지 렌더링
  res.render('main', {
    title: '메인 페이지 타이틀',
    // 로그인 오류 발생 시 1회 플래시 처리
    loginError: req.flash('loginError'),
  });
});


module.exports = router;
