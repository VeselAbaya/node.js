const utils = require('./utils');

it('should add two numbers', () => {
  const res = utils.add(5, 5);
  if (res !== 10)
    throw new Error(`5 + 5 != ${res}`);
});

it ('should square the number', () => {
  const res = utils.square(20);
  if (res !== 400)
    throw new Error(`20^2 != ${res}`);
});