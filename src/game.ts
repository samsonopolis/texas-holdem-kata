export class Game {
  hand
  constructor(private cards) {
    this.hand = new Hand(cards);
  }

  bestHand() {

  }
}

class Card {
  rank: string;
  suit: string;
  suits = ['C', 'H', 'S', 'D'];
  ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  constructor(private cardString: string) {
    this.rank = cardString.slice(0, cardString.length - 1);
    this.suit = cardString.slice(cardString.length - 1);
    this.validate();
  }

  validate() {
    if (this.suits.includes(this.suit) && this.ranks.includes(this.rank)) {
      return;
    }
    throw new Error('Invalid card');
  }

  toString() {
    return `${this.rank}${this.suit}`;
  }
}

class Hand {
  hand
  handSize = 7;

  constructor(private cardsString) {
    this.hand = this.cardsString.split(' ').map(card => new Card(card));
    this.validate();
  }

  validate() {
    if (this.hand.length > this.handSize) {
      throw new Error('Too many cards');
    }

    if (this.hand.length < this.handSize) {
      throw new Error('Too few cards');
    }

    if (new Set(this.hand.map(card => card.toString())).size !== this.handSize) {
      throw new Error('Duplicate cards');
    }
  }
}
