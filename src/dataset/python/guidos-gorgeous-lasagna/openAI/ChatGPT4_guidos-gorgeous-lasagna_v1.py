EXPECTED_BAKE_TIME = 40
PREPARATION_TIME = 2

def bake_time_remaining(time_baked):
    return EXPECTED_BAKE_TIME - time_baked

def preparation_time_in_minutes(layers_number):
    return PREPARATION_TIME * layers_number

def elapsed_time_in_minutes(number_of_layers, elapsed_bake_time):
    return (PREPARATION_TIME * number_of_layers) + elapsed_bake_time