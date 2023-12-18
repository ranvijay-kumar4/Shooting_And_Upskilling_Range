// Pattern printing

#include <iostream>

using namespace std;

int main()
{
    /*
    // system("cls");
    int i, j, row, col;
    cin >> row >> col;

        // Rectangle
                 ****
                 ****
                 ****
                 ****
                 ****
        for (i = 1; i <= row; i++)
        {
            for (j = 1; j <= col; j++)
            {
                cout << "*";
            }
            cout << "\n";
        }
    */

    /*
    // Hollow Rectangle
            ****
            *  *
            *  *
            *  *
            ****
     for (i = 1; i <= row; i++)
     {
         for (j = 1; j <= col; j++)
         {
             if (i == 1 || i == row || j == 1 || j == col)
             {
                 cout << "*";
             }
             else
             {
                 cout << " ";
             }
         }
         cout << "\n";
     }
 */

    /*
     int n;
     cin >> n;

     // Inverted Half Pyramid
               *****
               ****
               ***
               **
               *
     for (i = n; i >= 1; i--)
     {
        for (j = 1; j <= i; j++)
        {
            cout << "*";
        }
        cout << endl;
     }
    */

    /*
        // Half Pyramid after 180 rotation
                          *
                         **
                        ***
                       ****
                      *****
        for (i = 1; i <= n; i++)
        {
            for (j = 1; j <= n; j++)
            {
                if (j <= n - i)
                {
                    cout << " ";
                }
                else
                {
                    cout << "*";
                }
            }
            cout << endl;
        }
    */

    int n;
    cin >> n;
    /*
      // Half Pyramid Using Numbers
                     1
                     22
                     333
                     4444
                     55555

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                cout << i;
            }
            cout << endl;
        }

                     1
                     12
                     123
                     1234
                     12345
 for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                cout << j;
            }
            cout << endl;
        }
            // Floyd's Traingle
                      1
                      2 3
                      4 5 6
                      7 8 9 10
                      11 12 13 14 15
    int count = 1;
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= i; j++)
        {
            cout << count <<" ";
            count++;
        }
        cout << endl;
    }
    */

// Butterfly Pattern

    return 0;
}