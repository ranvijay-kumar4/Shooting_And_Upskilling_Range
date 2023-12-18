/*Any year is entered through the keyboard. Write a function to determine whether the
year is a leap year or not. */

#include <stdio.h>

int leap(int year);
int year;

int main()

{
    printf("\nEnter the year to check whether that is leap or not : ");
    scanf("%d", &year);
    leap(year);
    return 0;
}

int leap(int year)
{
    if (year % 4 == 0)
    {
        printf("\n---\t%d is a Leap Year\t---\n\n", year);
    }
    else
    {
        printf("\n---\t%d is not a Leap Year\t---\n\n", year);
    }
}