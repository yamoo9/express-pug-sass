const path = require('path');

// sequelize 패키지 로드 (클래스)
const Sequelize = require('sequelize');

// 개발(기본 값), 테스트, 배포 설정 하나의 값을 env에 설정
const env = process.env.NODE_ENV || 'development';

// config.json 설정 중 env 값에 일치하는 데이터를 config에 설정
const config = require('../config/config.json')[env];

// 데이터베이스, 사용자이름, 비밀번호를 설정
const { database, username, password } = config;

// Sequelize 클래스를 통해 인스턴스 생성 (데이터베이스, 사용자이름, 비밀번호, 환경설정)
const sequelize = new Sequelize(databse, username, password, config);

// db 객체에 클래스, 인스턴스를 속성으로 설정
const db = {
  Sequelize,
  sequelize
};

// db 객체(모듈) 내보내기
module.exports = db;