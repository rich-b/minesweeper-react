# MineSweeper

## How to Run
* First, be sure to use a recent version of Node (I used 7.10)
* Then, run `npm i` to install all dependencies
* Then, to run the dev server just `npm run start`
    * This should open http://localhost:3000/ in a browser. If for some reason it does not launch automatically, just copy/paste this url.

## How to Run Tests
`npm run test`


## How to Play
I think all normal rules apply.  Just click on cells to reveal information about nearby bombs.  Flag locations as having a bomb by right-clicking on the cell.  Once you have marked all bombs successfully you win!  There are 10 mines.

## Design, etc
* Each piece of the UI is broken into components so there is a clear separation of concern.
* Application state is only altered via Redux.  This helps keep application code predicable and readable since all mutations occur in only one location.
* All game related logic is contained in /lib/mineSweeper.js.  This was done so the UI could mostly be focused on UI related things and could avoid being concerned too much about how the game logic works.

## What's left/missing?
* More tests
* Sass Modules instead of global css
* Ability to 'unflag' a mine
* Ability to change number of mines (UI work only)

This project is based on `create-react-app-with-redux`
https://github.com/tstringer/create-react-app-with-redux
