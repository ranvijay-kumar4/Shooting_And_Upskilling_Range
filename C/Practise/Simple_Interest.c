// Program to calculate Simple Interest

#include <conio.h>
#include <stdio.h>
void main()
{
    // system("cls");
    printf("HELLO WORLD\n");

    int P;
    printf("Enter the Principal Amount :");
    scanf("%d", &P);

    float R;
    printf("Enter the Rate or Interest [in Percentage] :");
    scanf("%f", &R);

    float T;
    printf("Enter the Time Period [in Years] :");
    scanf("%f", &T);

    float SI;
    SI = P * R * T / 100;

    printf("The Simple Interest of Your Amount of [Rs. %d],\n Interest Rate [%.2f Percent ]\n and the Time Period [%.2f Years]\n is :%02f ", P, R, T, SI);
    printf("\n_____THANK YOU_____");
    getch();
}
