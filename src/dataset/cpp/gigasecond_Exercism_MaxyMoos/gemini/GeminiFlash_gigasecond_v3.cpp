#include "gigasecond.h"
#include <chrono>

using namespace std::chrono;

date gigasecond::advance(date inputDate) {
    // A gigasecond is 1,000,000,000 seconds
    auto input_time_point = boost::gregorian::to_time_point(inputDate);
    auto gigasecond_duration = seconds(1000000000);
    auto result_time_point = input_time_point + gigasecond_duration;
    return boost::gregorian::date_from_tm(boost::gregorian::to_tm(result_time_point));
}