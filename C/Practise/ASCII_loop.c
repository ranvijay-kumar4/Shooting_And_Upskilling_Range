#include <stdio.h>

int main()

{
    int i = 0;
    // while (i < 128)
    // {
    //     printf("\t%d - %c\n", i, i);

    //     i++;
    // }

    // for (; i < 128; i++)
    // {
    //     printf("\t%d - %c\n", i, i);
    // }

    do
    {
        printf("\t%d - %c\n", i, i);
        i++;
    } while (i < 128);

    return 0;
}