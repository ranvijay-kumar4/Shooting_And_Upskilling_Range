// Program to calculate Simple Interest using while loop until the given condition is satisfied.

#include <conio.h>
#include <stdio.h>
int main()
{
    int i=1, P, count;
    float R, T, SI;
    // system("cls");
    printf("\nEnter The number of entries to calculate :");
    scanf("%d", &count);
    while (i <= count)
    {
        printf("\nEntry Number : %d", i);
        printf("\nEnter the Principal Amount :");
        scanf("%d", &P);

        printf("\nEnter the Rate or Interest [in Percentage] :");
        scanf("%f", &R);

        printf("\nEnter the Time Period [in Years] :");
        scanf("%f", &T);

        SI = P * R * T / 100;

        printf("\nThe Simple Interest of Your Amount of [Rs. %d],\n Interest Rate [%.2f Percent ]\n and the Time Period [%.2f Years]\n is :%02f \n", P, R, T, SI);
        i = i + 1;
    }

    printf("\n_____THANK YOU_____");
    return 0;
}
