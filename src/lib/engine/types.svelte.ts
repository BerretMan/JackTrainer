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
    } else if (['jack','queen','king'].includes(typeOfCard)){
      this.value = 10;
    } else  if (['ace'].includes(typeOfCard)){
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

// https://www.blackjackinfo.com/fr/moteur-de-strategie-de-base-pour-le-blackjack/?numdecks=6&soft17=h17&dbl=all&das=yes&surr=ns&peek=yes
/** <9 S ; >16 S  */

export type Action = 'H' | 'S' | 'D' | 'DS' | 'P';
export const HARD_STRATEGY: Record<number, Record<number, Action>> = {
  9 : {2: 'H',3:'D',4:'D',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',11:'H'},
 10 : {2: 'D',3:'D',4:'D',5:'D',6:'D',7:'D',8:'D',9:'D',10:'H',11:'H'},
 11 : {2: 'D',3:'D',4:'D',5:'D',6:'D',7:'D',8:'D',9:'D',10:'D',11:'D'},
 12 : {2: 'H',3:'H',4:'S',5:'S',6:'S',7:'H',8:'H',9:'H',10:'H',11:'H'},
 13 : {2: 'S',3:'S',4:'S',5:'S',6:'S',7:'H',8:'H',9:'H',10:'H',11:'H'},
 14 : {2: 'S',3:'S',4:'S',5:'S',6:'S',7:'H',8:'H',9:'H',10:'H',11:'H'},
 15 : {2: 'S',3:'S',4:'S',5:'S',6:'S',7:'H',8:'H',9:'H',10:'H',11:'H'},
 16 : {2: 'S',3:'S',4:'S',5:'S',6:'S',7:'H',8:'H',9:'H',10:'H',11:'H'}
}

export const SOFT_STRATEGY: Record<number, Record<number, Action>> = {

  13 : {2: 'H',3:'H',4:'H',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',11:'H'},
  14 : {2: 'H',3:'H',4:'H',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',11:'H'},
  15 : {2: 'H',3:'H',4:'D',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',11:'H'},
  16 : {2: 'H',3:'H',4:'D',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',11:'H'},
  17 : {2: 'H',3:'D',4:'D',5:'D',6:'D',7:'H',8:'H',9:'H',10:'H',11:'H'},
  18 : {2: 'DS',3:'DS',4:'DS',5:'DS',6:'DS',7:'S',8:'S',9:'H',10:'H',11:'H'},
  19 : {2: 'S',3:'S',4:'S',5:'S',6:'DS',7:'S',8:'S',9:'S',10:'S',11:'S'},
  20 : {2: 'S',3:'S',4:'S',5:'S',6:'S',7:'S',8:'S',9:'S',10:'S',11:'S'}
}

export const PAIRS_STRATEGY: Record<number, Record<number, Action>> = {
  2 : {2: 'P',3:'P',4:'P',5:'P',6:'P',7:'P',8:'H',9:'H',10:'H',11:'H'},
  3 : {2: 'P',3:'P',4:'P',5:'P',6:'P',7:'P',8:'H',9:'H',10:'H',11:'H'},
  4 : {2: 'H',3:'H',4:'H',5:'P',6:'P',7:'H',8:'H',9:'H',10:'H',11:'H'},
  5 : {2: 'D',3:'D',4:'D',5:'D',6:'D',7:'D',8:'D',9:'D',10:'H',11:'H'},
  6 : {2: 'P',3:'P',4:'P',5:'P',6:'P',7:'H',8:'H',9:'H',10:'H',11:'H'},
  7 : {2: 'P',3:'P',4:'P',5:'P',6:'P',7:'P',8:'H',9:'H',10:'H',11:'H'},
  8 : {2: 'P',3:'P',4:'P',5:'P',6:'P',7:'P',8:'P',9:'P',10:'P',11:'P'},
  9 : {2: 'P',3:'P',4:'P',5:'P',6:'P',7:'S',8:'P',9:'P',10:'S',11:'S'},
  10 : {2: 'S',3:'S',4:'S',5:'S',6:'S',7:'S',8:'S',9:'S',10:'S',11:'S'},
  11 : {2: 'P',3:'P',4:'P',5:'P',6:'P',7:'P',8:'P',9:'P',10:'P',11:'P'}
}


//
export class Hand {
  cards: Card[] = $state([]);
  st: number = $state(0);
  ht: number = $state(0);

  add_card(c:Card): void {
    this.cards.push(c);
    const result = this.calculHand(this.cards);
    this.st = result.st;
    this.ht = result.ht;
  }

  private calculHand(cards: Card[]): { st: number; ht: number } {
    let total = cards.reduce((sum, c) => sum + c.value, 0);
    let jack = cards.filter(c => c.value === 11).length;

    while (total > 21 && jack > 0) {
      total -= 10;
      jack--;
    }
    if (jack > 0) {
      return { st: total,ht: total - 10};
    } else {
      return { st: 0,ht: total };
    }
  }

  optimalMove(d_v:number): Action {
    if (this.cards.length == 2 && this.cards[0].value == this.cards[1].value) {
      return PAIRS_STRATEGY[this.cards[0].value][d_v];
    }

    if (this.st > 0) {
      if (this.st >= 20) return 'S';
      return SOFT_STRATEGY[this.st][d_v];
    }
    if (this.ht > 16) return 'S';
    if (this.ht < 9) return 'H';
    return HARD_STRATEGY[this.ht][d_v];
  }

  get score(): number {
    return this.st > 0 ? this.st : this.ht;
  }
}

/**
 *  st: soft total
 *  ht : hard total
 */
export class Move {
  p_hands: Hand[] = $state([new Hand()])
  p_i: number = $state(0)
  d_cards: Card[] = $state([])
  d_st: number = $state(0)
  d_ht: number = $state(0)

  add_dealer_card(c:Card): void {
    this.d_cards.push(c);
    const result = this.calculHand(this.d_cards);
    this.d_st = result.st;
    this.d_ht = result.ht;
  }

  optimalMove(): Action { return this.p_hands[this.p_i].optimalMove(this.d_score); }

  private calculHand(cards: Card[]): { st: number; ht: number } {
    let total = cards.reduce((sum, c) => sum + c.value, 0);
    let jack = cards.filter(c => c.value === 11).length;

    while (total > 21 && jack > 0) {
      total -= 10;
      jack--;
    }
    if (jack > 0) {
      return { st: total,ht: total - 10};
    } else {
      return { st: 0,ht: total };
    }
  }

  split(c1: card, c2: card) {
    const currentHand = this.p_hands[this.p_i];
    const splitCard = currentHand.cards.pop()!;
    const firstCard = currentHand.cards.pop()!;

    currentHand.st = 0;
    currentHand.ht = 0;
    currentHand.add_card(firstCard);
    currentHand.add_card(c1);

    const newHand = new Hand();
    newHand.add_card(c2);
    newHand.add_card(splitCard);
    this.p_hands.splice(this.p_i + 1, 0, newHand);
  }
  add_player_card(c: Card): void { this.p_hands[this.p_i].add_card(c);}

  get d_score(): number {
      return this.d_st > 0 ? this.d_st : this.d_ht;
  }

  get p_cards(): Card[] {
    return this.p_hands[this.p_i].cards;
  }
  get p_score(): number {
      const st = this.p_hands[this.p_i].st;
      const ht = this.p_hands[this.p_i].ht;
      return st > 0 ? st : ht;
  }
}
