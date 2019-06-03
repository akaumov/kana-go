import kanaData from "../../../kana_data";

export const generateTests = (selectedSectionIds, limit, questionsDirections) => {

    const characters = getCharactersSet(selectedSectionIds);
    const tests = [];
    const questionCharacterType = 'romaji';
    const variantCharacterType = 'katakana';

    while (tests.length < limit) {
        const randomIndex = Math.round(Math.random() * (characters.length - 1));

        const questionCharacter = characters[randomIndex];
        const isQuestionExist = tests.find(test => test.question === questionCharacter[questionCharacterType]);

        if (isQuestionExist) {
            continue;
        }

        const test = {
            question: questionCharacter[questionCharacterType],
            answer: questionCharacter[variantCharacterType],
            variants: generateVariants(selectedSectionIds, questionCharacter, variantCharacterType)
        };

        tests.push(test);
    }

    return tests;
};

const generateVariants = (sectionsIds, currentCharacter, variantCharacterType) => {

    const NUMBER_OF_VARIANTS = 4;

    const randomCharactersSet = getCharactersSet(['basic', 'handakuon_dakuon', 'yoon']);
    const randomCharacters = [];

    while (randomCharacters.length < 3) {
        const randomCharacter = getRandomCharacter(randomCharactersSet);

        if (randomCharacter.id === currentCharacter.id) {
            continue;
        }

        const isCharacterAlreadyExist = randomCharacters.find(character => character.id === randomCharacter.id);
        if (isCharacterAlreadyExist) {
            continue;
        }

        randomCharacters.push(randomCharacter);
    }

    const randomIndex = Math.round(Math.random() * (NUMBER_OF_VARIANTS - 1));

    randomCharacters.splice(randomIndex, 0, currentCharacter);
    return randomCharacters.map(character => character[variantCharacterType])
};

const getCharactersSet = (selectedSectionsIds) => {
    const characters = [];

    selectedSectionsIds.forEach(sectionId => {
        const section = kanaData.find(section => section.id === sectionId);
        section.items.forEach(rowItems => {
            rowItems.forEach(character => character.id && characters.push(character));
        });
    });

    return characters;
};




const getRandomCharacter = (charactersSet) => {
    const randomIndex = Math.round(Math.random() * (charactersSet.length - 1));
    return charactersSet[randomIndex];
};