EXPECTED_BAKE_TIME = 40
PREPARATION_TIME_PER_LAYER = 2

def bake_time_remaining(time_baked):
    """Calculate the bake time remaining.

    :param elapsed_bake_time: int baking time already elapsed.
    :return: int remaining bake time derived from 'EXPECTED_BAKE_TIME'.

    Function that takes the actual minutes the lasagna has been in the oven as
    an argument and returns how many minutes the lasagna still needs to bake
    based on the `EXPECTED_BAKE_TIME`.
    """
    return EXPECTED_BAKE_TIME - time_baked

def preparation_time_in_minutes(layers_number):
    """preparation time based on the number of layers"""
    return PREPARATION_TIME_PER_LAYER * layers_number

def elapsed_time_in_minutes(number_of_layers, elapsed_bake_time):
    """total elapsed time since the beginning of the recipe"""
    return (PREPARATION_TIME_PER_LAYER * number_of_layers) + elapsed_bake_time