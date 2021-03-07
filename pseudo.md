# main

## pseudo

### on load

- [x] landing page, load upon start
- [x] button click function(number of cells, pic type)

### game in play

- [x] The board size should be 3\*4; The cards should be dealt in random, every card has a match
- [ ] After flipping two cards with different images, the game should pause for a second. During that second, the other cards are not clickable.
- [ ] Add a number of wrong guesses counter.
- [ ] Add a timer.
- [ ] When the user wins, pop up a “You won!” overlay with a new game button
- [ ] Create a header with a “new game” button
- [x] randomize pictures: decide how to do
- [x] Q: event listener- what elements/s? where to transfer the result to?
- [x] Q: what events end the game: 1. game time is over 2. success in all rounds before end time

### design

- [ ] CSS
- [ ] The game page has to be mobile responsive

## Geekout

1. Add the ability to change the game theme (both images and card pattern).
2. Make the basic layout the “easy” level, add levels medium and hard (with more 18 and 24 cards).

## Ninja

1. Add flipping animation effect for the card.
2. Add a high score functionality, that will save the name of the person with the least amounts of wrong guesses.

- start on load
- when ends, check if sucsses = 6:

  - if so: game-end(win)
  - else: game-end(game-over)

- game-end(winOrGameOver){
  - show msg overlay
  - show btn: if usr click it: - destroy the board - call initializing
    }
