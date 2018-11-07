const SUITS = ['C', 'H', 'S', 'D'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export class Game {
  hand
  constructor(private cards) {
    this.hand = new Hand(cards);
  }

  bestHand() {
    const evaluator = new HandEvaluator(this.hand);
    return evaluator.evaluate();
  }
}

class Card {
  rank: string;
  suit: string;

  constructor(private cardString: string) {
    this.rank = cardString.slice(0, cardString.length - 1);
    this.suit = cardString.slice(cardString.length - 1);
    this.validate();
  }

  validate() {
    if (SUITS.includes(this.suit) && RANKS.includes(this.rank)) {
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

class HandEvaluator {
  constructor(private hand) { }

  evaluate() {
    return this.twoOfAKind() || this.highCard();
  }

  private highCard() {
    const highCardRank = this.hand.hand.reduce((acc, cur) => {
      const rank = cur.rank;
      return RANKS.indexOf(rank) > RANKS.indexOf(acc) ? rank : acc;
    }, '2');

    return `High Card (${highCardRank} high)`;
  }

  private twoOfAKind() {
    const rankCounts = this.hand.hand.reduce((acc, cur) => {
      const rank = cur.rank;
      if (acc[rank])
        return ({
          ...acc,
          [rank]: ++acc[rank]
        });
      return ({
        ...acc,
        [rank]: 1,
      });
    }, {});
    const pairs = Object.keys(rankCounts)
      .map(rank => ({ rank, count: rankCounts[rank] }))
      .filter(c => c.count === 2);
    if (pairs.length === 1)
      return `Two of a Kind (${pairs[0].rank} high)`;

    return false;
  }
}
