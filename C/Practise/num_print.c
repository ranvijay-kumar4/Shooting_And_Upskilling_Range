// Program to print Natural numbers using loops.

#include <stdio.h>

int main()
{
    int i = 1, r;
    // system("cls");
    printf("Enter the last Natural number upto have to print : ");
    scanf("%d", &r);

    while (i <= r)
    {
        printf("\t%d\t", i);
        i = i + 1;
    }

    printf("\n____THANK YOU____\n");

    return 0;
}
