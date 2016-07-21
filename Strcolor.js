'use strict';

var crypto = require('crypto');
var material = require('./lib/material.json');

var Strcolor = {
  get: function(str) {
    var hash = crypto.createHash('md5').update(str).digest('hex');

    // MaterialColorには16種類のプライマリカラーがあるため、MD5した前半16文字を加算し、Modをとり色相を決定する
    var hue = reduceFunc(hash, 0, 16);

    // 次に、明度・彩度を12段階の中から決定する
    var level = reduceFunc(hash, 16, 12);

    var color = material[hue].value[level].code;

    return color;
  }
};

function reduceFunc(hash, start, mod) {
  return hash.substr(start, 16).split('').
    reduce(function(acc, n){ return (acc + parseInt(n, 16)) % mod;}, 0);
}

module.exports = Strcolor;
