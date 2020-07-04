# scratch-api

A utility for interacting with the Scratch 3.0 website. This is an extended and updated version of [trumank's scratch-api](https://github.com/trumank/scratch-api) for the 2.0 website. See the [wiki](https://github.com/qucchia/scratch-api/wiki/) for details and documentation.
[![Run on Repl.it](https://repl.it/badge/github/qucchia/scratch-api)](https://repl.it/github/qucchia/scratch-api)

## Installation

Install by cloning this repository:
```sh
git clone https://github.com/qucchia/scratch-api.git
```
## Examples

Sets the user's backpack to a single script.
```javascript
var Scratch = require('scratch-api');
Scratch.UserSession.load(function(err, user) {
  if (err) return console.error(err);
  user.setBackpack([{
    type: 'script',
    name: '',
    scripts: [[['say:', 'Cheers!']]]
  }],
  function(err, res) {
    if (err) return console.error(err);
    console.log('Backpack set');
  });
});
```

Prints all of the cloud variables for the given project.
```javascript
var Scratch = require('scratch-api');

Scratch.UserSession.load(function(err, user) {
  user.cloudSession(<project>, function(err, cloud) {
    cloud.on('set', function(name, value) {
      console.log(name, value);
    });
  });
});
```

## See Also

This scratch-api module is setup to be easily added too and extended. If you need to make certain requests that are not present it should be easy to add them. The [Scratch Wiki](http://wiki.scratch.mit.edu/wiki/Scratch_API_(2.0)) has some pretty extensive documentation.

If you are feeling Pythonic today, check out Dylan Beswick's very similar [module for Python](https://github.com/Dylan5797/scratchapi).
