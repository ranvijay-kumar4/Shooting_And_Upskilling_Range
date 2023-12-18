/*Ramesh's basic salary is input through the keyboard.
His dearness allowance is 40% of basic salary, and house rent allowance is 20% of basic salary.
Write a prgm to calculate his gross salary.*/

#include <stdio.h>
#include <conio.h>

int main()
{
    float salary, sal_ary;

    // system("cls");

    printf("Enter Ramesh's Basic Salary : ");
    scanf("%f", &salary);
    sal_ary = salary + 0.4 * salary + 0.2 * salary;

    printf("Ramesh's Basic salary is : %0.2f\n", salary);
    printf("Ramesh's Basic salary (per year) is : %0.2f\n", salary * 12);

    printf("Ramesh's Dearness allowance is : %0.2f\n", 0.4 * salary);
    printf("Ramesh's Dearness allowance (per year) is : %0.2f\n", 0.4 * salary * 12);

    printf("Ramesh's House Rent is : %0.2f\n", 0.2 * salary);
    printf("Ramesh's House Rent (per year) is : %0.2f\n", 0.2 * salary * 12);

    printf("Ramesh's Gross salary is : %0.2f\n", sal_ary);
    printf("Ramesh's Gross salary (per year) is : %0.2f\n", sal_ary * 12);

    printf("\n_____THANK YOU_____");
    return 0;
}