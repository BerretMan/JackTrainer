export class Card {
    name:string;
    value:number;
    countValue: number;
  hidden = $state(false);
  constructor(name: string) {
    this.name = name
    const typeOfCard = name.split('_')[0].toLowerCase();
    if (['2','3','4','5','6','7','8','9','10'].includes(typeOfCard)) {
      this.value = parseInt(typeOfCard, 10);
    } else if (!['black','red'].includes(typeOfCard)){
      this.value = 10;
    } else {
      this.value = 11;
    }

    // Hi-lo count
    if (this.value >= 2 && this.value <= 6) { this.countValue = 1 }
    else if (this.value >= 7 && this.value <= 9) { this.countValue = 0 }
      else {this.countValue = -1}
  }

  getImage(): string {
    return `/cards/${this.name}.svg`;
  }

  flip(): void {
    this.hidden = !this.hidden;
  }
}

export class Deck {
  cards: Card[] = []
  constructor() {

    const color = ['clubs', 'diamonds', 'hearts', 'spades'];
    const value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'jack', 'king', 'queen'];
    color.forEach((c) =>
      value.forEach((v) =>
        this.cards.push(new Card(`${v}_of_${c}`
        ))));
  }

  getCard(value:string, color:string): Card {
    return new Card(`${value}_of_${color}`);
  }

  pickCard(): Card {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    const card = this.cards[randomIndex];

    this.cards = this.cards.filter((_,i) => i !== randomIndex)
    return card;
  }
}
