// Points using the given percentage and total Points.

#include <iostream>
#include <conio.h>

using namespace std;
int main()
{
    // system("cls");
    float Fv, Sv, Tt;

    cout << "Enter the Percentage : ";
    cin >> Fv;

    cout << "Enter the Total or Maximum Points : ";
    cin >> Sv;

    Tt = Fv * Sv / 100;

    cout << "Your Total Points : ";
    cout << Tt;

    getch();

    return 0;
}
