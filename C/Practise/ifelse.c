// This program is a simple basig structure of if control statement.
#include <conio.h>
#include <stdio.h>

int main()
{
    int num;
    float salary;

    printf("Enter the Number less than 10 : ");
    scanf("%d", &num);

    if (num < 10)
    {
        printf("Good one Buddy");

        printf("\n_____THANK YOU_____\n");
    }

    printf("Enter the basic salary : ");
    scanf("%f", &salary);
    printf("%f\n", salary);
    if (salary >= 100000)
    {
        printf("Salary is awesome as it is more than or equal to 100000");
    }
    else
    {
        printf("Is this is your salary, are you sure? ");
    }
    printf("\n_____THANK YOU AGAIN_____");

    return 0;
}
