#include "raindrops.h"
#include <string>
#include <map>

string raindrops::convert(int number) {
	string raindrops = "";
	const std::map<int, string> data = { { 3, "Pling" }, { 5, "Plang" }, { 7, "Plong" } };

	for (const auto& kv: data) {
		if (number % kv.first == 0)
			raindrops += kv.second;
	}

	return raindrops == "" ? std::to_string(number) : raindrops;
}