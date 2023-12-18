/*Consider a currency system in which there are notes of seven denomination, namely, 
Re.1, Rs.2, Rs.5, Rs.10, Rs.50, Rs.100. if a sum of Rs.N is entered through the keyboard, 
write a prgm to compute the smallest number of notes that will combine to give Rs.N*/
#include <stdio.h>
#include <conio.h>
#include <math.h>

int main()
{
    int amount, temp;
    // system("cls");
    printf("Enter amount :");
    scanf("%d", &amount);

    temp = amount/100; 
    amount= amount - (temp*100);
    printf("%d X 100 =%d\n", temp, (temp*100));

        temp = amount/50; 
    amount= amount - (temp*50);
    printf("%d X 50 =%d\n", temp, (temp*50));

        temp = amount/10; 
    amount= amount - (temp*10);
    printf("%d X 10 =%d\n", temp, (temp*10));

        temp = amount/5; 
    amount= amount - (temp*5);
    printf("%d X 5 =%d\n", temp, (temp*5));

        temp = amount/2; 
    amount= amount - (temp*2);
    printf("%d X 2 =%d\n", temp, (temp*2));

        temp = amount/1; 
    amount= amount - (temp*1);
    printf("%d X 1 =%d\n", temp, (temp*1));

    printf("\n____THANK YOU____");
    return 0;
}
