/*If a five digit number is input through the keyboard, write a prgm to calculate the sum of its digits.
If a five digit number is input through the keyboard, write a prgm to reverse the number.*/

#include <stdio.h>
#include <conio.h>

int main()
{
    int a, b, c, d, e, num;
    // system("cls");
    printf("Enter Five digit number : ");
    scanf("%d", &num);

    a = (num) % 10;
    b = (num / 10) % 10;
    c = (num / 100) % 10;
    d = (num / 1000) % 10;
    e = (num / 10000) % 10;
    printf("%d\n", a + b + c + d + e);
    printf("%d,%d,%d,%d,%d", a, b, c, d, e);

    printf("\n_____THANK YOU_____");
    return 0;
}
