#include <string>

using std::string;

namespace log_line {
    // Return the message from the given log line
    string message(string line) {
        // A log message has the form "[<LEVEL>]: <MESSAGE>", so the message
        // starts after the colon (and following space)
        const string pattern = ": ";
        int message_start = line.find(pattern) + pattern.length();
        return line.substr(message_start);
    }

    // Return the log level from the given log line
    string log_level(string line) {
        int level_start = line.find("[") + 1;
        int level_end = line.find("]");
        return line.substr(level_start, level_end - level_start);
    }

    // Take a standard log line, e.g. "[<LEVEL>]: <MESSAGE>", and return it in
    // the form "<MESSAGE> (<LEVEL>)"
    string reformat(string line) {
        return message(line) + " (" + log_level(line) + ")";
    }
}
