// Write a function power ( a, b ), to calculate the value of a raised to b.

#include <stdio.h>
#include <math.h>

float power(float a, float b);
float c;
int main()

{
    float x, y;
    printf("\nEnter the value which will be powered : ");
    scanf("%f", &x);
    printf("\nEnter the value of power : ");
    scanf("%f", &y);
 
    power(x, y);
    printf("\nThe result of the %f and %f is %0.2f\n\n", x, y, c);

    return 0;
}

float power(float a, float b)
{
    c = pow(a, b);
    return c;
}