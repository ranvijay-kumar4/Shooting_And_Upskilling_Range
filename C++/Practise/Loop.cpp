// This program is to show use of loops in a simple code.

#include <iostream>
#include <conio.h>

using namespace std;
int main()
{
    // system("cls");
    int i = 1, r;

    cout << "\nEnter no of repetition : ";
    cin >> r;
    while (i <= r /*condition*/)
    {
        cout << "\nNumber : " << i;
        cout << "\nSuccesfull";    // do this
        cout << "\nWhile LOOP\n "; // and do this
        i = i + 1;                 // Increment
    }

    cout << "\n_____THANK YOU_____";

    return 0;
}