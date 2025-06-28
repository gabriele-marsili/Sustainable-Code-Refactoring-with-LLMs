#ifndef RNA_TRANSCRIPTION_H
#define RNA_TRANSCRIPTION_H
#include <string>
using std::string;

namespace transcription {
	char to_rna(char RNA);
	string to_rna(string RNA);
}

#endif // !RNA_TRANSCRIPTION_H