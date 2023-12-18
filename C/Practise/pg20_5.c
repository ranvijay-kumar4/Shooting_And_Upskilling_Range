/*The length and breadth of a rectangle and radius of a circle are input through the keyboard.
Write a prgm to calculate the area and perimeter of the rectangle, and the area and circumference of the circle.*/

#include <conio.h>
#include <stdio.h>
#define pi 3.14
int main()
{
    float len, brd, rad;
    // system("cls");
    printf("Enter Length : ");
    scanf("%f", &len);
    printf("Enter Breadth : ");
    scanf("%f", &brd);
    printf("Enter Radius : ");
    scanf("%f", &rad);

    printf("AREA OF RECTANCLE : %0.2f\n", len * brd);
    printf("PERIMETER OF RECTANCLE : %0.2f\n", len + brd);
    printf("AREA OF CIRCLE : %0.2f\n", pi * rad * rad);
    printf("\n_____THANK YOU_____");
    return 0;
}
