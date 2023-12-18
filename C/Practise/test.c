// This folder is to test and run doubtful proograms and checking it.

#include <stdio.h>
#include <math.h>

int main()
{
    /*This program is to take input of two int type values and teo floating type values and printing output of addition
     and substraction of the num, providing input and giving output as same as following
     Input
     [10 4
     4.0 2.0]
     output [14 6
     6.0 2.0]*/

    int i, j;
    float k, l;
    scanf("%d %d", &i, &j);
    scanf("%f %f", &k, &l);

    printf("%d %d\n%0.1f %0.1f", i + j, i - j, k + l, k - l);

    return 0;
}
