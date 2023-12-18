/*The distace between two cities (in KM.) is input through the keyboard.
Write a  prgm to convert and print distance in meters, feet, inches and centimeters.*/
#include <stdio.h>
#include <conio.h>
int main()
{
    float dist;

    // system("cls");

    printf("Enter the measured distance between two cities : ");
    scanf("%f", &dist);

    printf("The distance in Metres is : %0.2f Metres\n", 1000 * dist);
    printf("The distance in Centimetres is : %0.2f Centimetres\n", 100000 * dist);
    printf("The distance in Feet is : %0.2f Feet\n", 3280.84 * dist);
    printf("The distance in Inches is : %0.2f Inches\n", 39370.1 * dist);

    printf("\n_____THANK YOU_____");
    return 0;
}
