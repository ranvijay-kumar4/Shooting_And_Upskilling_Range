//This program is to show use of loops in a simple code.
#include <stdio.h>
#include <conio.h>

int main()
{
    int i = 1, r;
    // system("cls");
    printf("\nEnter no of repetition : ");
    scanf("%d", &r);
    while (i <= r /*condition*/)
    {
        printf("\nNumber : %d", i);
        printf("\nSuccesfull");    // do this
        printf("\nWhile LOOP\n "); // and do this
        i = i + 1;                 // Increment
    }

    printf("\n_____THANK YOU_____");

    return 0;
}
