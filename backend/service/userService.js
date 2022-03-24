const logger = require('../lib/logger')
const userDao = require('../DAO/userDao')

const service = {
//user 비즈니스 로직 :  DB에 insert에 값을 넣어주나봐
//순차적
async reg(params) {
  let inserted = null;

  try {
    inserted = await userDao.insert(params);
    logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
  } catch (err) {
    logger.error(`(userService.reg) ${err.toString()}`);
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }

  // 결과값 리턴
  return new Promise((resolve) => {
    resolve(inserted);
  });
},
// selectList
async list(params) {
  let result = null;

  try {
    result = await userDao.selectList(params);
    logger.debug(`(userService.list) ${JSON.stringify(result)}`);
  } catch (err) {
    logger.error(`(userService.list) ${err.toString()}`);
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }

  return new Promise((resolve) => {
    resolve(result);
  });
},
};

module.exports = service;