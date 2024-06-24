#include <iostream>
#include <string.h>

using namespace std;

int getLength(char name[])
{
    int length = 0;
    int i = 0;

    while (name[i] != '\0')
    {
        length++;
        i++;
    }
    return length;
}

void char_reverse(char inp[])
{
    int i = 0, j = strlen(inp) - 1;
    while (i <= j)
    {
        swap(inp[i], inp[j]);
        i++;
        j--;
    }
}

void replaceSpace(char inp[])
{
    for (int i = 0; i < strlen(inp); i++)
    {
        if (inp[i] == ' ')
        {
            inp[i] = '@';
        }
    }
}

bool check_Palindrome(char inp[])
{
    int i = 0, j = strlen(inp) - 1;
    while (i <= j)
    {
        if (inp[i] == inp[j])
        {
            i++;
            j--;
        }
        else
        {
            return false;
        }
    }
    return true;
}

int main()
{

    // Taking input and output of character array

    // char ch[5];
    // cout << "Enter the Character of 5 letters : ";

    // cin >> ch;

    // cout << "Entered Letters : " << ch << endl;

    // -------------------------------------------------------------------------

    // Taking Two Word input in string

    // char ch[10];
    // cout << "Enter more than single word with limit 10 : ";
    // cin.getline(ch, 5);

    // cout << "Entered Word is : " << ch;

    // -------------------------------------------------------------------------

    // Printing Length of a Input string

    // char name[20];
    // cout << "Enter word : ";
    // cin >> name;
    // cin.getline(name, 20);

    // cout << "Length using user function is: " << getLength(name) << endl;
    // cout << "Length using inbuilt function is -> " << strlen(name) << endl;

    // -------------------------------------------------------------------------

    // Reversing a Charater / String input

    // char inp[20];
    // cin >> inp;

    // cout << "Provided input : " << inp << endl;
    // char_reverse(inp);
    // cout << "Processed Output : " << inp << endl;

    // -------------------------------------------------------------------------

    // Replacing Spaces and converting to @

    // char inp[20];
    // cin.getline(inp, 20);
    // cout << "Provided input : " << inp << endl;
    // replaceSpace(inp);
    // cout << "Processed Output : " << inp << endl;

    // -------------------------------------------------------------------------

    // Check for Palindrome

    // char inp[20];
    // cin >> inp;

    // cout << check_Palindrome(inp);

    return 0;
}