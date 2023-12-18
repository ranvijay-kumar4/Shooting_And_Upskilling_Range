/*Wind chill factor is the felt air temperature on exposed skin due to wind. The wind chill temperature is always 
lower than the air temperature.
wcf=35.74 +0.6215*T + (0.4275t - 35.75)*v^0.16 T=>Temperature, V=>Velocity*/
#include <stdio.h>
#include <conio.h>
#include <math.h>

int main()
{
    float T, V, wcf;
    // system("cls");
    printf("Enter the Temperature in Celcius: ");
    scanf("%f",&T);

    printf("Enter Velocity in KM/H : ");
    scanf("%f", &V);

    wcf=35.74 + 0.6215 * T + (0.4275*T - 35.75)* pow(V,0.16) ;

    printf("The Wind chill factor of given Temperature %0.2f and Velocity %0.2f is : %0.2f", T, V, wcf);

    printf("\n____THANK YOU____");
    return 0;
} 
