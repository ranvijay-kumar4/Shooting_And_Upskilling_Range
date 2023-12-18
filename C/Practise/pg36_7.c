/*If value of an angle is input through the keyboard, write a prgm to print all its Trignometric ratios. Only 
Sinx, Cosx, Tanx is been used in C, Not Cotx, Cosecx, Secx being used as it not supported.*/
#include <stdio.h>
// #include <conio.h>
#include <math.h>
#define PI 3.14

int main()
{
    float radian, degree;
    // system("cls");
    printf("Enter the angle in degree :");
    scanf("%f", &degree);
    radian=degree*(PI/180);
    printf("\nSin(%0.2f)=%0.2f", degree, sin(radian));
    printf("\nCos(%0.2f)=%0.2f", degree, cos(radian));
    printf("\nTan(%0.2f)=%0.2f", degree, tan(radian));
    printf("\nCosec(%0.2f)=%0.2f", degree, 1/sin(radian));
    printf("\nSec(%0.2f)=%0.2f", degree, 1/cos(radian));
    printf("\nCot(%0.2f)=%0.2f", degree, 1/tan(radian));

    printf("\n____THANK YOU____");
    return 0;
}
