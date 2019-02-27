const randomWords = require('random-words');

const request = require('request');

const ITERATIONS = process.argv[2];

const post_options = data => ({
  method: 'POST',
  url: 'http://localhost:3000/customers',
  headers: {
      'Content-Type': 'application/json'
  },
  body: data,
  json: true,
});
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const randomNumber = (high, low) => Math.floor(Math.random() * (high - low) + low);


const post_data = data => {
  console.log('Sending data: ' + JSON.stringify(data));
  request.post(post_options(data), (err, res, body) => {
    if (err) { return console.log(err); }
      console.log(body);
    });
  };

let companyName = randomWords();
for (let i=0; i<ITERATIONS; i++) {
	if (randomNumber(999,100) % randomNumber(10,0) === 0) {
		companyName = randomWords();
	}
	const website_id = randomWords({exactly:1, wordsPerString: 2, separator: '-'});
	const data = {
		"name" : randomWords({ exactly: 3, join: ' ' }),
		"password": randomWords(),
		"username": randomWords()+randomNumber(999,100),
		"meta": {
			"birthday": new Date(randomNumber(2010,1940),randomNumber(11,0), randomNumber(25,1)), 
			"website": `https://${website_id}.github.io/`,
			"likes": randomWords(10),
			"company": companyName,
		}
	}
	post_data(data);
}
