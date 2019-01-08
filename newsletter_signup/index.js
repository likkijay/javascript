// Dependencies
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const Request = require('request');


// App init
const app = express();

// Middleware
  // body-parser
app.use(bodyParser.urlencoded({extended: true}));
  // static files
app.use(express.static(path.join(__dirname, 'public')));

// App routes
  // post request to /signup
app.post('/signup', (request, response) => {
  const { firstName, lastName, email } = request.body;

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  const options = {
    url: 'https://<dc>.api.mailchimp.com/3.0/lists/id_of_list',
    method: 'POST',
    headers: {
      'Authorization': 'auth API-KEY'
    },
    body: postData
  };

  Request(options, (error, resp, body) => {
    if (error) {
      response.redirect('/fail.html');
    } else {
      if (resp.statusCode === 200) {
        response.redirect('/success.html');
      } else {
        response.redirect('/fail.html');
      }
    }
  });
});

// App start up
app.listen(5000, () => console.log('Server started'));
