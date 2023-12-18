/*While purchasing certain items, a discount of 10% is offered if the quantity purchased is more than 1000.
If quantity and price per item are input through the keyboard, write a program to calculate the total expenses.*/
#include <conio.h>
#include <stdio.h>

int main()
{
    int q;
    float r, sum;
    // system("cls");
    printf("Enter Rate : ");
    scanf("%f", &r);
    printf("Enter Quantity : ");
    scanf("%d", &q);
    sum = r * q;
    printf("Your Original Price is : %f", sum);
    if (sum > 1000)
    {
        sum = (q * r) - (0.1 * q * r);
        printf("\nYou have to pay an amount of %0.2f after 10 percent discount ", sum);
    }

    printf("\n____THANK YOU____");
    return 0;
}
