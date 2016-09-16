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
  //Date in yyyymmdd format
  start: '20160726',
  end: '20160825',
};

//Second parameter is a path to where the api response will be stored 
amplitude.export.export(params, "temp/export_response", function(err, res) {
  // handle err and response
  ...
});
```
