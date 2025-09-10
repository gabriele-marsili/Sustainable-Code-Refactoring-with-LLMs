EXPECTED_BAKE_TIME = 40
PREPARATION_TIME_PER_LAYER = 2

def bake_time_remaining(time_baked):
    """Calculate the bake time remaining."""
    return EXPECTED_BAKE_TIME - time_baked

def preparation_time_in_minutes(layers_number):
    """Calculate preparation time based on the number of layers."""
    return layers_number * PREPARATION_TIME_PER_LAYER

def elapsed_time_in_minutes(number_of_layers, elapsed_bake_time):
    """Calculate total elapsed time since the beginning of the recipe."""
    return (number_of_layers * PREPARATION_TIME_PER_LAYER) + elapsed_bake_time