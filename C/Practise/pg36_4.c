/*Write a prgm to recieve Cartesian co-ordinate (x,y) of a point
and convert them into polar co-ordinate(r,o) => r=sqrt(x^2+y^2) and o=tan^-1(y/x)*/

#include <math.h>
#include <stdio.h>
#include <conio.h>
#define pi 3.14

int main()
{
    float x, y, u, r, d, t, o;
    // system("cls");
    printf("Enter the Cartesian Co-ordinates : ");
    scanf("%f %f", &x, &y);
    printf("%f\n", y);
    r = sqrt(x * x + y * y);
    t = sqrt(x);
    u = sqrt(y);
    o = atan(y / x);
    printf("Square root of x & y is :( %0.2f, %0.2f)\n", t, u);
    printf("Polar Co-ordinate : (%0.3f, %0.3f)\n", r, o);

    printf("\n_____THANK YOU_____");
    return 0;
}
