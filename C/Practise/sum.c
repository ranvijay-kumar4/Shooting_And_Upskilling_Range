#include <stdio.h>
#include <math.h>
#define PI 3.14

int main()

{
    int a, b;
   // system("cls");

    printf("Enter the nmber : ");
    scanf("%d", &a);
    // printf("Enter the second nmber : ");
    // scanf("%d", &b);
   float c = PI*a*a;
    printf("Area of %d is %0.2f\n", a, c);

    return 0;
}