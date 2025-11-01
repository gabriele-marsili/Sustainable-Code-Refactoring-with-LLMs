#pragma once

#include <vector>

namespace prime_factors {
	using namespace std;

	vector<int> of(int nNum);
}

//prime_factors.cpp
//#include "prime_factors.h"
using namespace std;

vector<int> prime_factors::of(int nNum) {
	vector<int> vnFactors;
	
	if (nNum <= 1) return vnFactors;
	
	// Handle factor 2 separately to avoid even numbers in main loop
	while (nNum % 2 == 0) {
		vnFactors.push_back(2);
		nNum /= 2;
	}
	
	// Check odd factors from 3 onwards
	for (int i = 3; i * i <= nNum; i += 2) {
		while (nNum % i == 0) {
			vnFactors.push_back(i);
			nNum /= i;
		}
	}
	
	// If nNum is still > 1, it's a prime factor
	if (nNum > 1) {
		vnFactors.push_back(nNum);
	}
	
	return vnFactors;
}