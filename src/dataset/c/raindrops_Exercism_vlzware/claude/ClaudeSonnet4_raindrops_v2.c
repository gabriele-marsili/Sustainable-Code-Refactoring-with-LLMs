#include "raindrops.h"
#include <stdio.h>

void convert(char *buf, int drops)
{
	int pos = 0;
	char *ptr = buf;
	
	if (drops % 3 == 0) {
		*ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
		pos = 1;
	}
	if (drops % 5 == 0) {
		*ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
		pos = 1;
	}
	if (drops % 7 == 0) {
		*ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
		pos = 1;
	}
	
	if (pos) {
		*ptr = '\0';
	} else {
		sprintf(buf, "%i", drops);
	}
}