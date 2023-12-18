/*Write a prgm to recieve values of latitude(L1,L2) and Longitude(G1,G2), in degrees,
of two places on the earth and output the distance (D) between them in nautical miles.
D=3963cos^-1(sinL1*sinL2 + cosL1*cosl2*cos(G2-G1))or D=3963cos^-1(cos(L2-L1)*cos(G2-G1))*/
#include <stdio.h>
#include <conio.h>
#include <math.h>

int main()
{
    float L1, L2, G, L, G1, G2, D;
    // system("cls");

    printf("Enter Value of coordinates named as L1 and G1 : ");
    scanf("%f %f", L1, G1);
    printf("Enter value of coordinates named as L2 and G2 : ");
    scanf("%f, %f", L2, G2);
    G = G2 - G1;
    L = L2 - L1;
    D = 3963 * acos((sin(L1) * sin(L2) + cos(L1) * cos(L2) * cos(G)));
    D = 3963 * acos(cos(L2 - L1) * cos(G2 - G1));

    printf("The distance between Coordinates %f, %f and Coordinates %f, %f is %f nautical miles : ", L1, L2, G1, G2, D);

    printf("\n____THANK YOU____");
    return 0;
}
