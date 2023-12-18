/* Any integer is input through the keyboard. Write a program to find out whether it
is an odd number or even number.*/

/* Any year is input through the keyboard. Write a program to determine whether the
year is a leap year or not.*/

#include <stdio.h>

int main()

{ // system("cls");
    int num, year; char choice;
    printf("Enter your Choice Y for Year and N for number : ");
    scanf("%c", &choice);
  {
    if (choice == 'N')
    {

        printf("Enter the Number : ");
        scanf("%d", &num);

        if (num % 2 == 0)
        {
            printf(" Even ");
        }
        else
        {
            printf(" Odd ");
        }
        goto end;
    }


    if (choice=='Y')
    {
        
        printf("Enter the Year : ");
        scanf("%d", &year);

        if (year % 4 == 0)
        {
            printf(" Leap year  ");
        }
        else
        {
            printf(" Not a Leap year ");
        }
        goto end;
    }
    else 
    {
        printf("Invalid Input"); 
    }
  }

 end:
    return 0;
}