/*If the marks obtained by a student in five different subjects are input through the keyboard,
write a prgm to findout the aggregate marks and percentage marks obtained by the student.
Assume that the maximum marks that can be obtained by a student in each subject is 100.*/

#include <stdio.h>
#include <conio.h>

int main()
{
    int F, S, T, Fo, Fi, Marks;
    float Per;
    // system("cls");
    printf("Enter Your Marks in the First Subject out of 100 : ");
    scanf("%d", &F);
    printf("Enter Your Marks in the Second Subject out of 100 : ");
    scanf("%d", &S);
    printf("Enter Your Marks in the Third Subject out of 100 : ");
    scanf("%d", &T);
    printf("Enter Your Marks in the Fourth Subject out of 100 : ");
    scanf("%d", &Fo);
    printf("Enter Your Marks in the Fifth Subject out of 100 : ");
    scanf("%d", &Fi);

    Marks = F + S + T + Fo + Fi;
    printf("Your scored aggregate marks is : %d out of 500\n", Marks);

    Per = Marks / 5;
    printf("Your scored Percentage is : %0.2f out of 100\n", Per);

    printf("\n_____THANK YOU_____");
    return 0;
}
