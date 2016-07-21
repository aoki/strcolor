'use strict';

var crypto = require('crypto');
var material = require('./lib/material.json');

var Strcolor = {
  get: function(str) {
    var hash = crypto.createHash('md5').update(str).digest('hex');

    // MaterialColorには16種類のプライマリカラーがあるため、MD5した前半16文字を加算し、Modをとり色相を決定する
    var hue = hash.substr(0, 16).split('').reduce(function(acc, n){ return (acc + parseInt(n, 16)) % 16;}, 0);

    // 次に、明度・彩度を12段階の中から決定する
    var level = hash.substr(16, 16).split('').reduce(function(acc, n){ return (acc + parseInt(n, 16)) % 12;}, 0);

    var color = material[hue].value[level].code;

    return color;
  }
};

module.exports = Strcolor;
