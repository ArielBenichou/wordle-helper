# Wordle Helper
a helper for the daily [Wordle](https://www.powerlanguage.co.uk/wordle/)

Link for the live webiste: https://wordle-helper-nine.vercel.app/


## TODO
  - [X] **Reset results.** When reset - reset results (`possibleWords`) to empty array (initial state)
  - [ ] **Add smart status.**
    - [x] Check in column if one of the letter is already green - if yes make all the same letter in the same color green automaticaly
    - [x] same for yellow
    - [ ] check if is the same in all the rows! not just one above
  - [X] Add all six lines (`boxesContainer`)
  - [ ] Make unit test for algo
  - [ ] Refactor algorithm to seperate file
  - [ ] Add Github icon to here in the footer
  - [ ] Add toast when trying to earse non existent word and "max words" when trying to add more words at the end
  - [ ] Optimize words file - cut words by files per length and lazy load as the setting length
    - [ ] If words are sorted we can use them to splice the array by position
    - [ ] 
  - [X] Add hint and color on top of grid by the side of reset
  - [ ] Desktop css
    - [ ] Grid
    - [X] Keyboard
  - [X] Mobile keyboard css fix
  - [X] Refactor consts to file
  - [X] Use local storage to save state
    - [ ] Maybe save the words list
  - [ ] Add Setting icon
    - [ ] Add Light Theme - toggle
    - [ ] Add words length
  - [ ] Refactor `App.js` (too long!)
  - [X] Add keyboard Input
    - [X] Backspace for delete
    - [X] Space to change color of last letter 
  - [X] Disable Zoom
