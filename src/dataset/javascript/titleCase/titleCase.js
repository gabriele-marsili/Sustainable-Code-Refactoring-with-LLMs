// PROBLEM
// A string is considered to be in title case if each word in the string is either
// (a) capitalised (that is, only the first letter of the word is in upper case) 
// or (b) considered to be an exception and put entirely into lower case unless 
// it is the first word, which is always capitalised.

// Write a function that will convert a string into title case, given an optional
// list of exceptions (minor words). The list of minor words will be given as a
// string with each word separated by a space. Your function should ignore the 
// case of the minor words string -- it should behave in the same way even if the 
// case of the minor word string is changed.

// RULES
// First argument (required): the original string to be converted.
// Second argument (optional): space-delimited list of minor words that must always 
// be lowercase except for the first word in the string. The JavaScript/CoffeeScript 
// tests will pass undefined when this argument is unused.

// EXAMPLES
// titleCase('a clash of KINGS', 'a an the of') // should return: 'A Clash of Kings'
// titleCase('THE WIND IN THE WILLOWS', 'The In') // should return: 'The Wind in the Willows'
// titleCase('the quick brown fox') // should return: 'The Quick Brown Fox'

function titleCase(title, minorWords) {
  if (title.length === 0) return title
  
  words = title.split(' ').map( w => w.toLowerCase() )
  
  if ( minorWords ) {
    minorWords = minorWords.split(' ').map( w => w.toLowerCase() )
  }
  
  words = words.map( word => {
    return word.slice(0, 1).toUpperCase() + word.slice(1)
  })
  
  if ( minorWords ) {
    minorWords = minorWords.map( word => {
      return word.slice(0, 1).toUpperCase() + word.slice(1)
    })
  }
  
  if ( minorWords ) {
    words = words.map( word => {
      return minorWords.includes(word) ? word.toLowerCase() : word
    })
  }
  
  firstWord = words[0].slice(0, 1).toUpperCase() + words[0].slice(1)
  words[0] = firstWord
  
  return words.join(' ')
}

export default titleCase;