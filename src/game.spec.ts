import { Game } from './game';

describe('Texas Hold Em', () => {
  fdescribe('invalid cards', () => {
    it('does not accept bad card - 1H', () => {
      expect(() => new Game("2C 3C 4C 5C 6C 7C 1H")).toThrowError(Error, "Invalid card");
    });

    it('does not accept bad card - 2J', () => {
      expect(() => new Game("2C 3C 4C 5C 6C 7C 2J")).toThrowError(Error, "Invalid card");
    });

    it('does not accept more than 7 cards', () => {
      expect(() => new Game("KD 9H 10D AD JD 6S QD 6D")).toThrowError(Error, "Too many cards");
    });

    it('does not accept less than 7 cards', () => {
      expect(() => new Game("KD 9H 10D AD JD 6S")).toThrowError(Error, "Too few cards");
    });

    it('does not accept duplicated cards', () => {
      expect(() => new Game("KD 9H 10D AD JD 6S 9H")).toThrowError(Error, "Duplicate cards");
    });
  });

  describe('#bestHand', () => {
    let game;

    describe('royal flush', () => {
      beforeEach(() => {
        game = new Game("KD 9H 10D AD JD 6S QD")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("Royal Flush (A high)");
      });
    });

    describe('straight flush', () => {
      beforeEach(() => {
        game = new Game("KD 9H 10D 9D JD 6S QD")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("Straight Flush (K high)");
      });
    });

    describe('four of a kind', () => {
      beforeEach(() => {
        game = new Game("4C 7D 7H 3S 7C 10H 7S")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("Four of a Kind (7 high)");
      });
    });

    describe('full house with correct high card', () => {
      beforeEach(() => {
        game = new Game("AH AC 2D 2H 2C 5S 8S")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("Full House (2 high)");
      });
    });

    describe('flush beats straight', () => {
      beforeEach(() => {
        game = new Game("2D 4D 6D 7C 8C 9D 10D")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("Flush (10 high)");
      });
    });

    fdescribe('straight', () => {
      beforeEach(() => {
        game = new Game("2C 4D AH 6S 5D 3C 10S")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("Straight (6 high)");
      });
    });

    fdescribe('three of a kind', () => {
      beforeEach(() => {
        game = new Game("4C 7D QH 3S 7H 10H 7S")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("Three of a Kind (7 high)");
      });
    });

    fdescribe('two pair', () => {
      beforeEach(() => {
        game = new Game("4C 7D QH 3S 7H 10H QS")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("Two Pair (Q high)");
      });
    });

    fdescribe('two of a kind', () => {
      beforeEach(() => {
        game = new Game("4C 7D 2H 3S JD 10H 7S")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("Two of a Kind (7 high)");
      });
    });

    fdescribe('high card', () => {
      beforeEach(() => {
        game = new Game("4C 7D 2H 3S KD 10H 6S")
      });

      it('outputs correct hand', () => {
        expect(game.bestHand()).toEqual("High Card (K high)");
      });
    });
  });
});
