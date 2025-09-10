EXPECTED_BAKE_TIME = 40
PREPARATION_TIME = 2

def bake_time_remaining(time_baked):
    return EXPECTED_BAKE_TIME - time_baked

def preparation_time_in_minutes(layers_number):
    return layers_number * PREPARATION_TIME

def elapsed_time_in_minutes(number_of_layers, elapsed_bake_time):
    return (number_of_layers * PREPARATION_TIME) + elapsed_bake_time