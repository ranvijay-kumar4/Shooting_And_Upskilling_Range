//Percentage using Points scored and total points.

#include<iostream>
#include<conio.h>


using namespace std;
int main()
{
    system("cls");
float Fv, Sv, Tt;

cout<<"Enter the Scored Points : "; cin>> Fv ;

cout<<"Enter the Total or Maximum points : "; cin>> Sv ;

Tt = Fv/Sv * 100 ;

cout<<"Your Percentage : "<<Tt<<" %";


return 0;

}