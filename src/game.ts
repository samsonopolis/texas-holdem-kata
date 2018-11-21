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
    return this.straight() || this.threeOfAKind() || this.twoPair() || this.twoOfAKind() || this.highCard();
  }

  private highCard() {
    const highCardRank = this.hand.hand.reduce((acc, cur) => {
      const rank = cur.rank;
      return RANKS.indexOf(rank) > RANKS.indexOf(acc) ? rank : acc;
    }, '2');

    return `High Card (${highCardRank} high)`;
  }

  private twoOfAKind() {
    const pairs = this.getRanksWithCount(2);

    if (pairs.length === 1)
      return `Two of a Kind (${pairs[0].rank} high)`;

    return false;
  }

  private twoPair() {
    const pairs = this.getRanksWithCount(2);

    if (pairs.length === 2) return `Two Pair (${pairs[0].rank} high)`;

    return false;
  }

  private threeOfAKind() {
    const threeCards = this.getRanksWithCount(3);

    if (threeCards.length > 0) return `Three of a Kind (${threeCards[0].rank} high)`;

    return false;
  }

  private straight() {
    let orderedHand = Array.from(new Set(this.hand.hand
      .map(card => RANKS.indexOf(card.rank))))
      .sort((a, b) => +a - +b);
    if (orderedHand.includes(RANKS.indexOf('A'))) {
      orderedHand = [-1, ...orderedHand]
    }
    const straightRankIndex = orderedHand.reduce((highestStraightRank, rank) => {
      const a = Array.from({ length: 5 }, (v, k) => k + +rank);
      return a.every(rank => orderedHand.includes(rank))
        ? +rank + 4 : highestStraightRank;
    }, undefined);

    if (straightRankIndex)
      return `Straight (${RANKS[+straightRankIndex]} high)`

    return false;
  }

  private getRanksWithCount(count) {
    const rankCounts = this.getRankCounts();
    return Object.keys(rankCounts)
      .map(rank => ({ rank, count: rankCounts[rank] }))
      .filter(c => c.count === count)
      .sort((a, b) => RANKS.indexOf(b.rank) - RANKS.indexOf(a.rank));
  }

  private getRankCounts() {
    return this.hand.hand.reduce((acc, cur) => {
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
  }
}
