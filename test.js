module.exports = function (nn, ls) {

  var total = 0
    , correct = 0
    , bad_log = []
    ;

  ls.forEach(function(data) {
    ++total;
    var x = nn.test(data.xs);
    if (Math.round(x) == data.t) ++correct;
    else bad_log[bad_log.length] = data;
  });

  console.warn('Accuracy: ' + Math.round(correct/total*100*100)/100 + '%');

  return bad_log;
}
