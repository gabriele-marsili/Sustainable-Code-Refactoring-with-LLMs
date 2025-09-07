#include "two_fer.h"

void two_fer(char *buffer, char *name) {
    if (name != NULL) {
        char *src = "One for ";
        char *dst = buffer;
        while (*src) *dst++ = *src++;
        
        src = name;
        while (*src) *dst++ = *src++;
        
        src = ", one for me.";
        while (*src) *dst++ = *src++;
        *dst = '\0';
    } else {
        char *src = "One for you, one for me.";
        char *dst = buffer;
        while (*src) *dst++ = *src++;
        *dst = '\0';
    }
}