# Timer for Websites That Steal Your Time

This project helps to control time was spent on [Geektimes](https://geektimes.ru).
It requires special extension for Chrome browser.

# Installing

Install extension for Chrome browser [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija).

Open [Geektimes site](https://geektimes.ru).

Open configuration of [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija)
browser extension on the site you want to controll. Click on the link
"your own external scripts", add path
`https://cdn.rawgit.com/John2013/34_timemachine/983c3b81/index.js`.
Don't forget to press "enable cjs for this host" to enable custom JS
then click `save`.

After page reload timer will started in site header and will remind you to get back to work

For faster development you can use JS code hosted on localhost. Simple web server can be used for that, run:

```bash

python3 -m http.server
```

Add path `http://localhost:8000/index.js` to [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension. Done.

# Other info

Messages was taken in [Ranc58/34_timemachine](https://github.com/Ranc58/34_timemachine) repo.

# Project Goals

The code is written for educational purposes. Training course for web-developers - [DEVMAN.org](https://devman.org)
