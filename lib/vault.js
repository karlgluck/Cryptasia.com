/*
(The MIT License)
Copyright (c) 2011-2012 James Coglan
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*
Copyright (c) 2012 Unseen Studios
Notes:
    - Charsets specified differently
    - NO SPACES IN PASSWORDS.  They're automatically removed from any charset because the
      Android default browser is dumb and doesn't understand that copy+paste actually needs
      to preserve whitespace.
*/
var Vault = function (settings) {
    this._phrase = settings.phrase;
    this._length = settings.length;
    this._repeat = Vault.DEFAULT_REPEAT;
    this._required = [];

    var i;
    this._allowed = Vault.parseCharset(settings.allow);
    var require = settings.require.split(' ');
    for (i in require) {
        i = require[i];
        if (i.length > 0) { this.require(Vault.parseCharset(i), 1); }
    }

    var n = this._length - this._required.length;
    while (n >= 0 && n--) this._required.push(this._allowed);
};

Vault.UUID = '9dc321fd-fb14-c0a5-1627-ef3762fe2d89';
Vault.DEFAULT_REPEAT = 1;

Vault.parseCharset = function (charset) {
    return charset.replace(/ /g, '') // disallow spaces
                  .replace(/\[a-z\]/g, 'abcdefghijklmnopqrstuvwxyz')
                  .replace(/\[A-Z\]/g, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
                  .replace(/\[0-9\]/g, '0123456789')
                  .split('')
                  .sort();
}

Vault.extend = function(target, source) {
  for (var key in source) {
    if (!target.hasOwnProperty(key))
      target[key] = source[key];
  }
  return target;
};

Vault.createHash = function(key, message, entropy) {
  var CJS    = (typeof CryptoJS !== 'undefined') ? CryptoJS : require('./crypto-js-3.0.2'),
      digits = (entropy || 256) / 4;
  
  return CJS.PBKDF2(key, message, {keySize: Math.ceil(digits / 8), iterations: 8}).toString();
};

Vault.indexOf = function(list, item) {
  if (list.indexOf) return list.indexOf(item);
  for (var i = 0, n = list.length; i < n; i++) {
    if (list[i] === item) return i;
  }
  return -1;
};

Vault.map = function(list, callback, context) {
  if (list.map) return list.map(callback, context);
  var result = [];
  for (var i = 0, n = list.length; i < n; i++)
    result.push(callback.call(context, list[i]));
  return result;
};

Vault.pbkdf2 = function(password, salt, keylen, iterations, callback) {
  if (typeof require === 'function' && require('crypto').pbkdf2)
    return require('crypto').pbkdf2(password, salt, iterations, 4 * keylen, function(error, key) {
      callback(error, new Buffer(key, 'binary').toString('hex'));
    });
  
  var CJS = (typeof CryptoJS !== 'undefined') ? CryptoJS : require('./crypto-js-3.0.2'),
      key = CJS.PBKDF2(password, salt, {keySize: keylen, iterations: iterations});
  
  callback(null, key.toString());
};

Vault.toBits = function(digit) {
  var string = parseInt(digit, 16).toString(2);
  while (string.length < 4) string = '0' + string;
  return string;
};

Vault.prototype.subtract = function(charset, allowed) {
  if (!charset) return;
  allowed = allowed || this._allowed;
  for (var i = 0, n = charset.length; i < n; i++) {
    var index = Vault.indexOf(allowed, charset[i]);
    if (index >= 0) allowed.splice(index, 1);
  }
  return allowed;
};

Vault.prototype.require = function(charset, n) {
  if (!charset) return;
  while (n--) this._required.push(charset);
};

Vault.prototype.entropy = function() {
  var entropy = 0;
  for (var i = 0, n = this._required.length; i < n; i++) {
    entropy += Math.ceil(Math.log(i+1) / Math.log(2));
    entropy += Math.ceil(Math.log(this._required[i].length) / Math.log(2));
  }
  return entropy;
};

Vault.prototype.generate = function (service) {
    if (this._required.length > this._length)
        throw new Error('Length too small to fit all required characters');

    if (this._allowed.length === 0)
        throw new Error('No characters available to create a password');

    var required = this._required.slice(),
      stream = new Vault.Stream(this._phrase, service, this.entropy()),
      result = '',
      index, charset, previous, i, same;

    while (result.length < this._length) {
        index = stream.generate(required.length);
        charset = required.splice(index, 1)[0];
        previous = result.charAt(result.length - 1);
        i = this._repeat - 1;
        same = previous && (i >= 0);

        while (same && i--)
            same = same && result.charAt(result.length + i - this._repeat) === previous;
        if (same)
            charset = this.subtract([previous], charset.slice());

        index = stream.generate(charset.length);
        result += charset[index];
    }
    if (result.length != this._length) {
        throw "Password incorrect length!"
    }
    return result;
};


// Generate uniformly distributed output in any base from a bit stream
// http://checkmyworking.com/2012/06/converting-a-stream-of-binary-digits-to-a-stream-of-base-n-digits/
Vault.Stream = function(phrase, service, entropy) {
  this._phrase  = phrase;
  this._service = service;
  
  var hash = Vault.createHash(phrase, service + Vault.UUID, 2 * entropy),
      bits = Vault.map(hash.split(''), Vault.toBits).join('').split('');
  
  this._bases = {
    '2': Vault.map(bits, function(s) { return parseInt(s, 2) })
  };
};

Vault.Stream.prototype.generate = function(n, base, inner) {
  base = base || 2;
  
  var value = n,
      k = Math.ceil(Math.log(n) / Math.log(base)),
      r = Math.pow(base, k) - n,
      chunk;
  
  loop: while (value >= n) {
    chunk = this._shift(base, k);
    if (!chunk) return inner ? n : null;
    
    value = this._evaluate(chunk, base);
    
    if (value >= n) {
      if (r === 1) continue loop;
      this._push(r, value - n);
      value = this.generate(n, r, true);
    }
  }
  return value;
};

Vault.Stream.prototype._evaluate = function(chunk, base) {
  var sum = 0,
      i   = chunk.length;
  
  while (i--) sum += chunk[i] * Math.pow(base, chunk.length - (i+1));
  return sum;
};

Vault.Stream.prototype._push = function(base, value) {
  this._bases[base] = this._bases[base] || [];
  this._bases[base].push(value);
};

Vault.Stream.prototype._shift = function(base, k) {
  var list = this._bases[base];
  if (!list || list.length < k) return null;
  else return list.splice(0,k);
};


if (typeof module === 'object')
  module.exports = Vault;

