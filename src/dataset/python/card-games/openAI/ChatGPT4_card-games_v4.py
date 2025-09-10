"""Functions for tracking poker hands and assorted card tasks.

Python list documentation: https://docs.python.org/3/tutorial/datastructures.html
"""

def get_rounds(number):
    """Create a list containing the current and next two round numbers."""
    return [number, number + 1, number + 2]

def concatenate_rounds(rounds_1, rounds_2):
    """Concatenate two lists of round numbers."""
    return rounds_1 + rounds_2

def list_contains_round(rounds, number):
    """Check if the list of rounds contains the specified number."""
    return number in rounds

def card_average(hand):
    """Calculate and returns the average card value from the list."""
    return sum(hand) / len(hand)

def approx_average_is_average(hand):
    """Return if an average is using (first + last index values ) OR ('middle' card) == calculated average."""
    avg = card_average(hand)
    return ((hand[0] + hand[-1]) / 2 == avg) or (hand[len(hand) // 2] == avg)

def average_even_is_average_odd(hand):
    """Return if the (average of even indexed card values) == (average of odd indexed card values)."""
    even = hand[1::2]
    odd = hand[::2]
    return (sum(odd) / len(odd)) == (sum(even) / len(even)) if even else False

def maybe_double_last(hand):
    """Multiply a Jack card value in the last index position by 2."""
    if hand[-1] == 11:
        hand[-1] = 22
    return hand