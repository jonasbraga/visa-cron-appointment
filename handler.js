'use strict';

const { getDate } = require('./src/scrapping');
const { sendEmail } = require('./src/email');

module.exports.run = async (event, context) => {

  console.time();
  try {
    const dates = await getDate();
    const nextAvailableDate = dates[0].date;

    if (isDateCloser(nextAvailableDate)) {
      const emailResponse = await sendEmail(['jonasbraga2001@gmail.com'], 'Visa closer available date', `Good news! the next available date is: ${nextAvailableDate}`);
    }

    console.log('The next avaible date is', dates[0].date);
    console.timeEnd();
    return {
      statusCode: 200,
      body: JSON.stringify({
        nextDate: dates[0].date
      })
    }
  } catch (error) {
    console.timeEnd();
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error
      })
    }
  }
};

function isDateCloser(date) {

  const currentAppointmentDate = new Date('2022-06-01');
  const maxCloserDate = new Date('2022-04-25');
  const nextDate = new Date(date)

  return (maxCloserDate > nextDate) && (nextDate < currentAppointmentDate);
}
