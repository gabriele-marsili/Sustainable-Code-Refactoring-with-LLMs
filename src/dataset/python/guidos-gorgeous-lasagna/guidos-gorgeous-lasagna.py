# TODO: define the 'EXPECTED_BAKE_TIME' constant
EXPECTED_BAKE_TIME = 40
# TODO: define the 'PREPARATION_TIME' constant
PREPARATION_TIME = 0

# TODO: define the 'bake_time_remaining()' function
def bake_time_remaining(time_baked):
    
    """Calculate the bake time remaining.

    :param elapsed_bake_time: int baking time already elapsed.
    :return: int remaining bake time derived from 'EXPECTED_BAKE_TIME'.

    Function that takes the actual minutes the lasagna has been in the oven as
    an argument and returns how many minutes the lasagna still needs to bake
    based on the `EXPECTED_BAKE_TIME`.
    """

    return(EXPECTED_BAKE_TIME - time_baked)

# TODO: define the 'preparation_time_in_minutes()' function
def preparation_time_in_minutes(layers_number):
    """preparation time based on the number of layers"""
    return (2*layers_number)
# TODO: define the 'elapsed_time_in_minutes()' function
def elapsed_time_in_minutes(number_of_layers, elapsed_bake_time):
    """total elapsed time since the beginning of the recipe"""
    return(preparation_time_in_minutes(number_of_layers) + elapsed_bake_time)
