class Card {
  constructor(pattern, denomination) {
      this._pattern = pattern;
      this._denomination = denomination;
  }

  get pattern() {
      return this._pattern;
  }

  set pattern(pattern) {
      this._pattern = pattern;
  }

  get denomination() {
      return this._denomination;
  }

  set denomination(denomination) {
      this._denomination = denomination;
  }
}

class CardDeck {
  constructor() {
      this.cards = [];
      this.initializeDeck();
  }

  initializeDeck() {
      const patterns = ["Hearts", "Diamonds", "Clubs", "Spades"];
      const denominations = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

      for (const pattern of patterns) {
          for (const denomination of denominations) {
              this.cards.push(new Card(pattern, denomination));
          }
      }
      this.shuffleDeck();
  }

  shuffleDeck() {
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
  }

  getCard() {
      return this.cards.pop();
  }
}

class Dealer {
  constructor() {
      this.cards = [];
  }

  receiveCard(card) {
      this.cards.push(card);
  }

  openCards() {
      return this.cards;
  }
}

class Gamer {
  constructor() {
      this.cards = [];
  }

  receiveCard(card) {
      this.cards.push(card);
  }

  openCards() {
      return this.cards;
  }
}

class Rule {
  getScore(cards) {
      let score = 0;
      let aces = 0;

      for (const card of cards) {
          const denomination = card.denomination;
          if ("JQK".includes(denomination)) {
              score += 10;
          } else if (denomination === "A") {
              aces += 1;
              score += 11;
          } else {
              score += parseInt(denomination);
          }
      }

      while (score > 21 && aces > 0) {
          score -= 10;
          aces -= 1;
      }

      return score;
  }

  getWinner(dealer, gamer) {
      const dealerScore = this.getScore(dealer.openCards());
      const gamerScore = this.getScore(gamer.openCards());

      if (gamerScore > 21) return "Dealer wins!";
      if (dealerScore > 21) return "Gamer wins!";
      if (dealerScore > gamerScore) return "Dealer wins!";
      if (gamerScore > dealerScore) return "Gamer wins!";
      return "It's a tie!";
  }
}

class Game {
  play() {
      console.log("========= Blackjack =========");
      const dealer = new Dealer();
      const gamer = new Gamer();
      const rule = new Rule();
      const cardDeck = new CardDeck();

      // Initial dealing
      gamer.receiveCard(cardDeck.getCard());
      gamer.receiveCard(cardDeck.getCard());
      dealer.receiveCard(cardDeck.getCard());
      dealer.receiveCard(cardDeck.getCard());

      console.log("Gamer's Cards:", gamer.openCards());
      console.log("Dealer's Cards:", dealer.openCards());

      // Determine winner
      const result = rule.getWinner(dealer, gamer);
      console.log(result);
  }
}

const game = new Game();
game.play();
