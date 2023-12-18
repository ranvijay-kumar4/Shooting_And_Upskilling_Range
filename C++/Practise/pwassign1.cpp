// PWSKIlLS Assignment 1 (C++ Variables and Data Types)

#include <iostream>
#include <cmath>

using namespace std;
int main()
{
     /* int a = 3;
      cout << a << endl;
      double b = 2;
      cout << b << endl;
      char c = 'D';
      cout << c << endl;
      bool d = true;
      cout << d << endl;
      string e = "Ranvijay";
      cout << e << endl;

      string firstName = "Ranvijay ";
      string lastName = "Kumar";
      string fullName = firstName.append(lastName);
      cout << fullName << endl;

      string txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      cout << "The length of the txt string is: " << txt.length() << endl;

      cout << "..................This is the PWSkills first assignment.............\n";
      cout << "...\t......\\.....\"\n";

      string myString = "Hello";
      cout << myString[0] << endl;
      cout << myString[1] << endl;
      cout << myString[4] << endl;
      cout << "Enter String : ";
      string str;
      getline(cin, str);
      cout << str << endl;

      cout << sqrt(64) << endl;
      cout << round(2.6) << endl;
      cout << log(2) << endl;

      cout << hypot(4, 3) << endl;*/

     int i = 0;
     /* while (i < 5)
      {
           cout << i << "\n";
           i++;
      }
      do
      {
           cout << i << "\n";
           i++;
      } while (i < 6);
      */
     for (int i = 0; i < 10; i++)
     {
          if (i == 4)
          {
               // break;
               continue;
          }
          cout << i << endl;
     }

     /*std::string c = "Ranvijay";
     std::cout << "..................This is the PWSkills first assignment.............";
     std::cout << "...\t......\\.....\"";*/

     /*
     Q1 - Take 2 integer values in two variables x and y and print their product. (Easy)
                 Sample Input : x=2, y=4 (Both integers)
                 Sample Output : 8
         int x = 5, y = 4;
         cout << " X = " << x << endl
              << "Y = " << y << endl
              << "Result = " << x * y;
                 */
     /*
     Q2 - Print the ASCII value of character ‘U’. (Easy)
                 Sample Input : already mentioned as ‘U’
                 Sample Output : 85
         char a = 'U';
         int b = a;
         cout << "ASCII Value = " << b;
         or
         cout<<(int)'U';
         */
     /*
     Q3 - Write a C++ program to take length and breadth of a rectangle and print its area. (Easy)
                 Sample Input : 7, 4
                 Sample Output : 28
         int length, breadth;
         cout << "Enter the length of rectangle : ";
         cin >> length;
         cout << endl;
         cout << "Enter the breadth of rectangle : ";
         cin >> breadth;
         cout << endl;
         cout << "The area of rectangle of given length : " << length << " and breadth : " << breadth << " is : " << length * breadth;
            */
     /*
     Q4 - Write a C++ program to calculate the cube of a number. (Easy)
                Sample Input : 4
                Sample Output : 64

     int num;
     cout << "Enter any number to get its cube : ";
     cin >> num;
     cout << endl
          << "The cube of given number : " << num << " is : " << num * num * num;
               */

     /*
     Q5 - Write a C++ program to find size of basic data types. (Medium)
                 Sample Input : Nil (Here it is expected that we explore the size of each data type that would be used commonly in the programs ahead. We can simply make use of sizeof(datatype) operator to accomplish this. Give it a try to know the data types in depth)
                 Sample Output :
                   Size of fundamental data types :
                   The sizeof(char) : 1 bytes
                   The sizeof(short) : 2 bytes
                   The sizeof(int) : 4 bytes
                   The sizeof(long): 4 bytes
                   The sizeof(long long) : 8 bytes
                   The sizeof(float) : 4 bytes
                   The sizeof(double) : 8 bytes
                   The sizeof(long double) : 12 bytes
                   The sizeof(bool) : 1 bytes
     cout << "The Size of char : " << sizeof(char) << " bytes" << endl
          << "The Size of short : " << sizeof(short) << " bytes" << endl
          << "The Size of int : " << sizeof(int) << " bytes" << endl
          << "The Size of long : " << sizeof(long) << " bytes" << endl
          << "The Size of long long : " << sizeof(long long) << " bytes" << endl
          << "The Size of float : " << sizeof(float) << " bytes" << endl
          << "The Size of double : " << sizeof(double) << " bytes" << endl
          << "The Size of long double : " << sizeof(long double) << " bytes" << endl
          << "The Size of bool : " << sizeof(bool) << " bytes" << endl;
     */

     /*
     Q6 - Write a C++ program to swap two numbers with the help of a third variable. (Hard)
                 Sample Input : 2, 3
                 Sample Output : 3, 2
     int num1, num2, num3;
     cout << "Enter the first number : ";
     cin >> num1;
     cout << "Enter the second number : ";
     cin >> num2;
     cout << "First Number : " << num1 << "Second Number : " << num2 << endl;
     num3 = num2;
     num2 = num1;
     num1 = num3;
     cout << "The swaped First Number : " << num1 << " Second Number : " << num2;
     */

     return 0;
}
