#include <stdio.h>

int main()

{
    int i = 7, j = &i;
    printf("%u\n", &i);
    printf("%d\n", *(&i));
    printf("%d\n", (&j));
    printf("%d\n", *(&j));

    return 0;
}