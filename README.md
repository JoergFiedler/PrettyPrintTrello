[![Build Status](https://travis-ci.org/JoergFiedler/PrettyPrintTrello.svg?branch=master)](https://travis-ci.org/JoergFiedler/PrettyPrintTrello)

# Pretty Print for Trello

Chrome extension which allows you to print Trello cards and check items easily. First 
working draft.

## Prerequisites

- NodeJS 0.10.12
- [grunt-cli](https://github.com/gruntjs/grunt-cli)
- ruby && sass, see https://github.com/gruntjs/grunt-contrib-sass

## Build It
    
    npm install
    node_modules/bower/bin/bower install
    grunt all

## Use It

Add folder ``chrome-extension`` as an unpacked extension. A new icon will
appear next to your location bar. Go to your Trello board and click it!

- Print cards from lists, when you hit the button while your board is visible
- Print check items from cards, when you hit the button while a card is open
