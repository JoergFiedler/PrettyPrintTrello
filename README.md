[![Build Status](https://travis-ci.org/murdochjohn/TrelloPrettyPrint.png?branch=master)](https://travis-ci.org/murdochjohn/TrelloPrettyPrint)

TrelloPrettyPrint
=================

Chrome extension which allows you to print Trello cards and check items easily. First 
working draft.

Prerequisites
-------------

- NodeJS 0.10.12
- [grunt-cli](https://github.com/gruntjs/grunt-cli)

Build It
--------
    
    npm install
    bower install
    grunt all

Use It
------
Add folder ``chrome-extension`` as unpacked extension to your browser. A new icon will
appear next to your location bar. Go to your Trello board and hit it!

There are 2 modes:
- Print cards from lists, if you hit the button while your board is visisble 
- Print check items from cards, if you hit the button while a card is open
