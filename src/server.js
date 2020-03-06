const {createServer} = require('https'); //RMV
const {readFileSync} = require('fs'); //RMV

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

//RMV
const options = {
  key: readFileSync('ssl/foobar.key'),
  cert: readFileSync('ssl/foobar.crt')
};
console.log('server.js x: options =', options);

/*
polka() // You can also use Express
  .use(compression({threshold: 0}), sirv('static', {dev}), sapper.middleware())
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
*/
//RMV
const {handler} = polka().use(
  compression({threshold: 0}),
  sirv('static', {dev}),
  sapper.middleware()
);

//RMV
createServer(options, handler).listen(PORT, err => {
  if (err) console.log('error', err);
});
