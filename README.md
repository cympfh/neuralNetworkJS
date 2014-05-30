```javascript
NN = require('./neu');

// one of train or test data
var data;
data[0] = { xs: [0, 1, 0], t: 1 } // `xs` is input and `t` is the answer for `xs`.

var datum = data; // `datum` is a list of `data`.

var m = 3 // the length of a input `xs`
  , k = (3 + 1) / 2 | 0 // the number of hidden units. I heard that this is good to be (m+1)/2.
  ;
var myInferencer = new NN(m, k, datum);

var x = myInferencer.test([0, 1, 0]); // the probability of that [0,1,0] -> 1

Math.round(x); // the round of `x` may be the answer
```
