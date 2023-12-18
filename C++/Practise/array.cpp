
#include <iostream>
#include<limit.h>

using namespace std;

int main()
{
    // Extereme Print
    // ---------------------------------------------------
    // // Test Case : a = 1,2,11,4,9,6,7,17 : Output = 1,17,2,7,11,6,4,9

    // int array[] = {1, 2, 11, 4, 9, 6, 7, 17};
    // int size = sizeof (array) / sizeof (int) ;
    //  cout << size << endl ;
    // int start = 0, end = size-1;
    //  while (true)
    //  {
    //     if (start > end)
    //     {
    //         break;
    //     }

    //     if ( start == end )
    //     {
    //         cout << array[start] << " ";
    //     }

    //     cout << array[start] << " " ;
    //     cout << array[end] << " " ;
    //     start++ ;
    //     end--;
    //  }

    // Array Reversal without using swap function
    // ---------------------------------------------------
    // // Test Case : a = 1,2,11,4,9,6,7,17 : Output = 17, 7, 6, 9, 4, 11, 2, 1

    // int array[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    // int size = sizeof(array) / sizeof(int);
    // int start = 0, end = size-1, temp ;

    // while (start <= end)
    // {
    //     temp = array[start] ;
    //     array[start] = array[end] ;
    //     array[end] = temp;

    //     start++ ;
    //     end--;
    // }

    // for (int i = 0; i < size; i++)
    // {
    //     cout << array[i] << " ";
    // }

    // Array Reversal using swap function
    // ---------------------------------------------------
    // // Test Case : a = 1,2,11,4,9,6,7,17 : Output = 17, 7, 6, 9, 4, 11, 2, 1

    // int array[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    // int size = sizeof(array) / sizeof(int), start = 0, end = size - 1;

    // while (start <= end)
    // {
    //     swap(array[start], array[end]);
    //     start++;
    //     end--;
    // }

    // for (int i = 0; i < size; i++)
    // {
    //     cout << array[i] << " ";
    // }

    

    return 0;
}
