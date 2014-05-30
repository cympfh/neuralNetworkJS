/*
  Neural network

  「パターン認識と機会学習」上巻
  p.246
  5.3.2 "単純な例"
  を実装したもの
  合ってるかそんな自信ないだけど

  パラメータ初期値ゼロから始めるとゼロのまま動かない (そもそもその挙動は正しい?)
  なので乱数を使ってるんだけど，その結果，たま〜にダメな結果出しちゃう

  あと訓練だけど収束まで，とするのが面倒なので適当に1000回，訓練するだけ

  function NN がそれ．その下に使い方の例を示します
 */

if (module && module.exports) module.exports = NN;

// N-input, M-unit in 1-hidden-layer and 1-output
function NN(N, M, datum) {
  this.w1 = [];
  this.w2 = [];
  this.b1 = [];
  this.b2 = Math.random() - .5;

  for (var i=0; i<M; ++i) {
    this.w1[i] = [];
    this.w2[i] = Math.random() - .5;
    this.b1[i] = Math.random() - .5;
    for (var j=0; j<N;+ ++j) {
      this.w1[i][j] = Math.random() - .5;
    }
  }

  this.iotaN = iota(N);
  this.iotaM = iota(M);

  var that = this;

  for (var cx=0; cx<1000; ++cx)
    for (var i=0, n=datum.length; i<n; ++i)
      train(datum[i]);

  function train(d) {
    var xs = d.xs
      , t  = d.t;
    const eps = .1;

    var z =
      that.iotaM.map(function(i){
        return tanh( that.iotaN.map(function(j){ return xs[j] * that.w1[i][j] }).reduce(add) + that.b1[i] );
      });

    var y =
      sigm( that.iotaM.map(function(i){ return z[i] * that.w2[i] }).reduce(add) + that.b2 );

    var deltak = y - t;
    for (var i=0; i<M; ++i) {
      that.w2[i] -= eps * deltak * z[i];
    }
    // that.b2 -= eps * deltak * that.b2;
    that.b2 -= eps * deltak;

    var delta = [];
    for (var i=0; i<M; ++i) {
      delta[i] = (1 - Math.pow(z[i], 2)) * that.w2[i] * deltak;
    }

    for (var i=0; i<M; ++i) {
      for (var j=0; j<N; ++j) {
        that.w1[i][j] -= eps * delta[i] * xs[j];
      }
      // that.b1[i] -= eps * delta[i] * that.b1[i];
      that.b1[i] -= eps * delta[i];
    }
  }

  function iota(n) {
    for (var i=0, ret=[]; i<n; ++i) ret[i] = i;
    return ret;
  }

  function tanh(x) { return 1 - 2 / (1 + Math.exp(2*x)); }
  function sigm(x) { return 1 / (1 + Math.exp(-x)) }
  function add(x,y) { return x+y }

  this.test = function(xs) {
    var that = this;
    var z =
      this.iotaM.map(function(i){
        return tanh( that.iotaN.map(function(j){ return xs[j] * that.w1[i][j] }).reduce(add) + that.b1[i] );
      });

    var y = sigm( that.iotaM.map(function(i){ return z[i] * that.w2[i] }).reduce(add) + that.b2 );

    return y;
  };
}
