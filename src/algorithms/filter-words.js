import { LetterStatus } from "../constants/letter-status";

export function filterWords(allWords, guessedWords) {
  const allAbsentLetters = guessedWords
    .reduce((acc, word) => {
      return [
        ...acc,
        ...word.filter((letter) => letter.status === LetterStatus.ABSENT),
      ];
    }, [])
    .map((letter) => letter.content);

  const allPresentLetters = guessedWords.reduce((acc, word) => {
    return [
      ...acc,
      ...word.filter((letter) => letter.status === LetterStatus.PRESENT),
    ];
  }, []);

  const possibleWords = allWords
    .filter((w) => {
      const regex = new RegExp(`[${allAbsentLetters.join("|")}]`, "gi");
      const found = w.match(regex);
      return !found;
    })
    .filter((w) => {
      return allPresentLetters.every((l) => {
        //the present letter can't be in its place
        if (w[l.id[1]] === l.content) return false;

        //but it must be in the word
        const regex = new RegExp(`${l.content}`, "gi");
        const found = w.match(regex);
        return found;
      });
    })
    .filter((w) => {
      return guessedWords.every((word) => {
        const pattern = word
          .map((l) => (l.status === LetterStatus.CORRECT ? l.content : "."))
          .join("");
        const regex = new RegExp(`${pattern}`, "gi");
        const found = w.match(regex);
        return found;
      });
    });
  return possibleWords;
}
