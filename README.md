# Wordle Helper
a helper for the daily [Wordle](https://www.powerlanguage.co.uk/wordle/)

Link for the live webiste: https://wordle-helper-nine.vercel.app/


## TODO
  - [ ] **Reset results.** When reset - reset results (`possibleWords`) to empty array (initial state)
  - [ ] **Add smart status.**
    - [ ] Check in column if one of the letter is already green - if yes make all the same letter in the same color green automaticaly
    - [ ] same for yellow
  - [X] Add all six lines (`boxesContainer`)
  - [ ] Make unit test for algo
  - [ ] Refactor algorithm to seperate file
  - [ ] Optimize words file - cut words that are not `length === 5` and sort if not sorted
    - [ ] If words are sorted we can use them to splice the array by position
  - [X] Add hint and color on top of grid by the side of reset
  - [ ] Desktop css
  - [X] Mobile keyboard css fix
  - [X] Refactor consts to file
  - [ ] Use local storage to save state (maybe the words list?)
  - [ ] Add Light Theme
    - [ ] Add theme toggle
  - [ ] Refactor `App.js` (too long!)
