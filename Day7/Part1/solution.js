const input = require("fs")
  .readFileSync("../input.txt", "utf-8")
  .split(/\r?\n/g);

const handOutcomes = {
  highCard: 0,
  onePair: 1,
  twoPair: 2,
  threeKind: 3,
  fullHouse: 4,
  fourKind: 5,
  fiveKind: 6,
};

const cardVal = "AKQJT98765432";

function getHandRes(hand) {
  const cards = [...new Set(hand)];

  if (cards.length == 1) return "fiveKind";
  if (cards.length == 2) {
    const [a, b] = cards;
    if (
      hand.indexOf(a) == hand.lastIndexOf(a) ||
      hand.indexOf(b) == hand.lastIndexOf(b)
    )
      return "fourKind";
    return "fullHouse";
  }

  if (cards.length == 3) {
    const [a, b, c] = cards;
    let countA = 0;
    let countB = 0;
    let countC = 0;

    for (let i = 0; i < hand.length; i++) {
      if (hand[i] == a) countA++;
      if (hand[i] == b) countB++;
      if (hand[i] == c) countC++;
    }
    if (countA == 3 || countB == 3 || countC == 3) return "threeKind";
    return "twoPair";
  }

  if (cards.length == 4) return "onePair";
  return "highCard";
}

console.log(
  input
    .sort((a, b) => {
      const [firstHand, firstBid] = a.split(" ");
      const [secondHand, secondBid] = b.split(" ");

      const firstType = getHandRes(firstHand);
      const secondType = getHandRes(secondHand);

      if (handOutcomes[firstType] > handOutcomes[secondType]) return -1;
      if (handOutcomes[firstType] < handOutcomes[secondType]) return 1;

      for (let i = 0; i < firstHand.length; i++) {
        if (cardVal.indexOf(firstHand[i]) < cardVal.indexOf(secondHand[i]))
          return -1;
        if (cardVal.indexOf(firstHand[i]) > cardVal.indexOf(secondHand[i]))
          return 1;
      }

      if (firstBid > secondBid) return -1;
      if (firstBid < secondBid) return 1;

      return 0;
    })
    .reduce(
      (acc, hand, i) => (acc += hand.split(" ")[1] * (input.length - i)),
      0
    )
);
