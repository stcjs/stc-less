# stc-less

Stc plugin for converting less to css

## Install

```sh
npm install stc-less
```

## How to use

```
var less2css = require('stc-less');

//less to css
stc.transpile({
  less2css: {plugin: less2css, include: /\.less/}
})
```
