import crypto from 'node:crypto';

const secretToken = crypto.randomBytes(32).toString('hex');
console.log(secretToken);

