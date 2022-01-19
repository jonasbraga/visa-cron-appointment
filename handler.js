'use strict';

const { getDate } = require('./src/scrapping');

module.exports.run = async (event, context) => {
  console.time();
  getDate();
  console.timeEnd();
};
