/* If cost price and selling price of an item are input through the keyboard, write a program to
determine whether the seller has made profit or incurred loss. Also determine how much profit he made or
loss he incurred.*/

#include <stdio.h>

int main()

{
    // system("cls");
    char item;
    float cost, sell;

    printf("Enter the Cost Price of Item : ");
    scanf("%f", &cost);

    printf("Enter the Selling Price of Item : ");
    scanf("%f", &sell);

    if (cost > sell)
    {
        printf("\n ---You are incurring loss on this this ---\n The amount is %0.2f ", cost - sell);
    }
    else if (sell > cost)
    {
        printf("\n ---You are making profit on this item ---\n The amount is %0.2f ", sell - cost);
    }
    else if (cost == sell)
    {
        printf("\n ---You are getting neither Profit nor Loss---\n ");
    }
    else
    {
        printf("\n ---INVALID---\n ");
    }

    return 0;
}