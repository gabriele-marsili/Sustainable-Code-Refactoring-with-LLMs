export const hey = (message) => {
  // console.log(message)
  message = message.trim()
  // console.log(message)
  if (message.length == 0) {
    return 'Fine. Be that way!'
  } 
  if (message[message.length-1] == "?") {
    if (message == message.toUpperCase() && message.search(/[^A-Za-z\s?]/) != 0) {
      return "Calm down, I know what I'm doing!"
    } else {
      return 'Sure.'
    }
  } else {
    if (message == message.toUpperCase() && message.search(/[^A-Za-z]/) != 0) {
      return 'Whoa, chill out!'
    } else if (message.search(/[A-Za-z]/) == -1) {
      return 'Whatever.'
    } else if (message == message.toUpperCase()) {
      return 'Whoa, chill out!'
    } else {
      return 'Whatever.'
    }
  }
};