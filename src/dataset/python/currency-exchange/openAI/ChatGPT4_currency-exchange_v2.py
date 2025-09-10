def exchange_money(budget, exchange_rate):
    return round(budget / exchange_rate, 2)


def get_change(budget, exchanging_value):
    return round(budget - exchanging_value, 2)


def get_value_of_bills(denomination, number_of_bills):
    return denomination * number_of_bills


def get_number_of_bills(budget, denomination):
    return budget // denomination


def exchangeable_value(budget, exchange_rate, spread, denomination):
    effective_rate = exchange_rate * (1 + spread / 100)
    return int((budget / effective_rate) // denomination * denomination)


def non_exchangeable_value(budget, exchange_rate, spread, denomination):
    effective_rate = exchange_rate * (1 + spread / 100)
    return int((budget / effective_rate) % denomination)