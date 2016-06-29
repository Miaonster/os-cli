OS Cli
======

Show OS version in command line.

Tired of rememberring kinds of commands of showing name and version of different Operating Systems? Try this simple one.

### Install Globally

    [sudo] npm install -g os-cli

Use it in command line:

    os

This will show your system basic information
    
    Mac OS X 10.9.2 (Darwin 13.1.0)

or

    CentOS 5.10 (Linux 3.9.3-x86-linode52)
    
or

    Ubuntu 12.04 (Linux 3.2.0-23-generic)
    
or

    Microsoft Windows 7 Ultimate Service Pack 1 (Windows_NT 6.1.7601)

### Install Locally

Use it in your project:

    npm install --save os-cli

Sample code:

```js
var os = require('os-cli');

os(function(error, info) {
  console.log(info);
});
```
