const { Chess } = require('chess.js')

const chess = new Chess()

// make some moves
chess.move('e4')
chess.move('e5')
chess.move('f4')

console.log(chess.fen())