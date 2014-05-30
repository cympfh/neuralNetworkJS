var NN = require('./neu')
  , test = require('./test')
  ;
var m = 5  // dim of each data
  , n = 300 // num of datum
  ;

var datum = [];
for (var i=0; i < n; ++i) {
  var xs = []
    , t = 0;
  for (var j=0; j < m; ++j) {
    var z = Math.round(Math.random());
    xs.push(z);
    t += z;
  }
  t = t % 2;
  datum.push({xs: xs, t: t});
}

var tr_datum = datum.slice(0, datum.length * .9 | 0)
  , te_datum = datum.slice(datum.length * .9 | 0)
  ;

var parity = new NN(m, m/2|0, tr_datum);

test(parity, te_datum);

