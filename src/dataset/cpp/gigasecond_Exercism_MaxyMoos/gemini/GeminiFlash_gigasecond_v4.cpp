#include "gigasecond.h"
#include <chrono>

using namespace std::chrono;

namespace boost {
namespace gregorian {

date gigasecond::advance(date inputDate) {
  auto input_days = inputDate.day_number();
  auto gigasecond_days = 11574LL;
  auto result_days = input_days + gigasecond_days;
  return date(day_number(result_days));
}

} // namespace gregorian
} // namespace boost