# node-amplitude [![Circle CI](https://circleci.com/gh/brightskylabs/node-amplitude.svg?style=svg)](https://circleci.com/gh/brightskylabs/node-amplitude)
NODE SDK for Amplitude APIs

## Usage

```javascript
'use strict';

var Amplitude = require('node-amplitude');

var amplitude = new Amplitude({
  key: AMPLITUDE_API_KEY,
  secret: AMPLITUDE_API_SECRET
});

var params = {
  start: '2012-05-01T02',
  end: '2012-05-02T03'
};

amplitude.export.export(params, function(err, res) {
  // handle err and response
  ...
});
```
