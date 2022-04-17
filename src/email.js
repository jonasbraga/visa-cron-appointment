const AWS = require('aws-sdk');

const AWS_SES = new AWS.SES({region:'us-east-1'});

let sendEmail = (recipientEmail, subject, body) => {
    let params = {
      Source: 'jonasbraga2001@gmail.com',
      Destination: {
        ToAddresses: [
          ...recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

module.exports = {
  sendEmail
};