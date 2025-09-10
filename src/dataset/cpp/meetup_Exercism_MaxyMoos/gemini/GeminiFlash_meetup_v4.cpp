#include "meetup.h"

using namespace boost::gregorian;
using namespace boost::date_time;

namespace meetup {

    scheduler::scheduler(int month, int year) : refMonth(month), refYear(year) {}

    date scheduler::teenth_generic(weekdays day) const {
        date tmp(refYear, refMonth, 13);
        auto day_of_week = tmp.day_of_week();
        if (day_of_week > day) {
            tmp += date_duration(7 - (day_of_week - day));
        } else if (day_of_week < day) {
            tmp += date_duration(day - day_of_week);
        }
        return tmp;
    }

    date scheduler::nth_generic(int n, weekdays day) const {
        date tmp(refYear, refMonth, 1);
        auto day_of_week = tmp.day_of_week();
        if (day_of_week > day) {
            tmp += date_duration(7 - (day_of_week - day));
        } else if (day_of_week < day) {
            tmp += date_duration(day - day_of_week);
        }
        tmp += date_duration(7 * (n - 1));
        return tmp;
    }

    date scheduler::last_generic(weekdays day) const {
        date tmp = date(refYear, refMonth, 1).end_of_month();
        auto day_of_week = tmp.day_of_week();
        if (day_of_week > day) {
            tmp -= date_duration(day_of_week - day);
        } else if (day_of_week < day) {
            tmp -= date_duration(7 - (day - day_of_week));
        }
        return tmp;
    }

    date scheduler::monteenth()         const   {return teenth_generic(Monday);     }
    date scheduler::tuesteenth()        const   {return teenth_generic(Tuesday);    }
    date scheduler::wednesteenth()      const   {return teenth_generic(Wednesday);  }
    date scheduler::thursteenth()       const   {return teenth_generic(Thursday);   }
    date scheduler::friteenth()         const   {return teenth_generic(Friday);     }
    date scheduler::saturteenth()       const   {return teenth_generic(Saturday);   }
    date scheduler::sunteenth()         const   {return teenth_generic(Sunday);     }

    date scheduler::first_monday()      const   {return nth_generic(1, Monday);     }
    date scheduler::first_tuesday()     const   {return nth_generic(1, Tuesday);    }
    date scheduler::first_wednesday()   const   {return nth_generic(1, Wednesday);  }
    date scheduler::first_thursday()    const   {return nth_generic(1, Thursday);   }
    date scheduler::first_friday()      const   {return nth_generic(1, Friday);     }
    date scheduler::first_saturday()    const   {return nth_generic(1, Saturday);   }
    date scheduler::first_sunday()      const   {return nth_generic(1, Sunday);     }

    date scheduler::second_monday()     const   {return nth_generic(2, Monday);     }
    date scheduler::second_tuesday()    const   {return nth_generic(2, Tuesday);    }
    date scheduler::second_wednesday()  const   {return nth_generic(2, Wednesday);  }
    date scheduler::second_thursday()   const   {return nth_generic(2, Thursday);   }
    date scheduler::second_friday()     const   {return nth_generic(2, Friday);     }
    date scheduler::second_saturday()   const   {return nth_generic(2, Saturday);   }
    date scheduler::second_sunday()     const   {return nth_generic(2, Sunday);     }

    date scheduler::third_monday()      const   {return nth_generic(3, Monday);     }
    date scheduler::third_tuesday()     const   {return nth_generic(3, Tuesday);    }
    date scheduler::third_wednesday()   const   {return nth_generic(3, Wednesday);  }
    date scheduler::third_thursday()    const   {return nth_generic(3, Thursday);   }
    date scheduler::third_friday()      const   {return nth_generic(3, Friday);     }
    date scheduler::third_saturday()    const   {return nth_generic(3, Saturday);   }
    date scheduler::third_sunday()      const   {return nth_generic(3, Sunday);     }

    date scheduler::fourth_monday()     const   {return nth_generic(4, Monday);     }
    date scheduler::fourth_tuesday()    const   {return nth_generic(4, Tuesday);    }
    date scheduler::fourth_wednesday()  const   {return nth_generic(4, Wednesday);  }
    date scheduler::fourth_thursday()   const   {return nth_generic(4, Thursday);   }
    date scheduler::fourth_friday()     const   {return nth_generic(4, Friday);     }
    date scheduler::fourth_saturday()   const   {return nth_generic(4, Saturday);   }
    date scheduler::fourth_sunday()     const   {return nth_generic(4, Sunday);     }

    date scheduler::last_monday()       const   {return last_generic(Monday);       }
    date scheduler::last_tuesday()      const   {return last_generic(Tuesday);      }
    date scheduler::last_wednesday()    const   {return last_generic(Wednesday);    }
    date scheduler::last_thursday()     const   {return last_generic(Thursday);     }
    date scheduler::last_friday()       const   {return last_generic(Friday);       }
    date scheduler::last_saturday()     const   {return last_generic(Saturday);     }
    date scheduler::last_sunday()       const   {return last_generic(Sunday);       }
}