const { shuffle } = require("./memories.js");

describe('good init ', () => {
    const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    it('should return something', () => (
        expect(shuffle(cards)).not.toEqual(1)
    ))
})