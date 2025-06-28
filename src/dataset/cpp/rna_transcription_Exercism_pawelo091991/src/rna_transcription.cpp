#include "rna_transcription.h"

char transcription::to_rna(char RNA) {
	return RNA == 'G' ? 'C' :
		RNA == 'C' ? 'G' :
		RNA == 'T' ? 'A' :
		RNA == 'A' ? 'U' :
		'?';
}

string transcription::to_rna(string RNA) {
	string newRNA;
	for (auto kv : RNA) newRNA += to_rna(kv);
	return newRNA;
}