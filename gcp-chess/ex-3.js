const { Chess } = require('chess.js')

const chess = new Chess()

// valid
if (chess.move({ from: 'e2', to: 'e4' })) {
    console.log('valid')
}
else {
    console.log('invalid')
}
if (chess.move({ from: 'e7', to: 'e5' })) {
    console.log('valid')
}
else {
    console.log('invalid')
}

//invalid
if (chess.move({ from: 'e2', to: 'e4' })) {
    console.log('valid')
}
else {
    console.log('invalid')
}

console.log(chess.ascii())