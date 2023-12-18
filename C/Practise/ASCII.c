/* Any character is entered through the keyboard, write a program to determine whether the
 character entered is a capital letter, a small case letter, a digit or a special symbol.
The following table shows the range of ASCII values for various characters:
Characters      ASCII Values
A – Z           65 – 90
a – z           97 – 122
0 – 9           48 – 57
special symbols 0 - 47, 58 - 64, 91 - 96, 123 - 127 */
#include <stdio.h>

int main()

{
    int d;
    char c;

    printf("Enter the character : ");
    scanf("%c", &c);
    d = c;
    printf("%d", d);

    // special symbols 0 - 47, 58 - 64, 91 - 96, 123 - 127
    if (d >= 0 && d < 48 && d > 57 && d < 65 && d > 90 && d < 97 && d > 122 && d < 128)
    {
        printf("\n---- You have entered the special character ---- \n");
    }

    // A – Z           65 – 90
    if (d > 64 && d < 91)
    {
        printf("\n---- You have entered the Capital Letter ---- \n");
    }

    //  a – z           97 – 122
    if (d > 96 && d < 123)
    {
        printf("\n---- You have entered the Small Letter ---- \n");
    }

    //  0 – 9           48 – 57
    if (d > 47 && d < 58)
    {
        printf("\n---- You have entered the Numeric Character ----\n\n");
    }

    return 0;
}