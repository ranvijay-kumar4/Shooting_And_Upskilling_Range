
#include <iostream>
#include <limits.h>

using namespace std;

bool search_num(int array[], int size, int num);
int count_z_o(int array[], int size, int count_z, int count_o);
int maxi_num(int array[], int size, int max_num);
int mini_num(int array[], int size, int min_num);

int main()
{

   // // Taking array input and providing its double as output
   // // Test Case Input : 1, 3, 5, 7; Output : 2, 6, 10, 14;
   //  int array[5], n;
   //  cout << "Enter the elements : ";
   //  for(int i=0; i<5; i++ )
   //  {
   //     cin >> array[i];
   //  }

   //  cout << "Doubles of the elements : ";
   //  for(int j=0; j<5; j++)
   //  {
   //     cout << 2 * array[j] << " " ;
   //  }

   // // Taking array input and changing all input to 1.
   // // Test case Input : 1,2, 3, 4, 5; Output : 1, 1, 1, 1, 1;
   // int array[5];
   // cout << "Enter Values of 5 size array : ";
   // for (int i=0; i<5; i++)
   // {
   //    cin >> array[i];
   //    array[i] = 1;
   // }

   // cout << "The output values of provided array : { ";
   // for (int i=0; i<5; i++)
   // {
   //    cout << array[i] << " ";
   // }
   // cout << "}" ;

   // ----------------LINEAR SEARCH---------------------

   // Searching any number in the given array
   // -----------------------------------------------------
   // int no, array[10] = {1,2,3,4,5,6,7,8,9,10};

   // no = 18;

   // for(int i=0; i<10; i++)
   // {
   //    if (array[i] == no)
   //    {
   //       cout << " Found at index no " << i << endl ;
   //       break ;
   //    }
   //    if (i == 9)
   //    {
   //       cout << " Not Found " ;
   //    }
   // }
   // ------------------------------------------------------

   // int array[]= {1,2,3,4,5,6,7,8,9};
   // int size = 9;
   // int num = 11;

   // if(search_num(array, size, num))
   // {
   //    cout << "Found";
   // }
   // else
   // {
   //    cout << "Not Found";
   // }

   // Counting Numbers of 0's and 1's in the array.
   // -----------------------------------------------
   // int array[]={1,0,1,1,0,1,0,1,1,0};
   // int size = 9 ;
   // int zero_count = 0, one_count = 0;

   // for(int i=0; i<size; i++)
   // {
   //    if(array[i]==0)
   //    {
   //       zero_count++;
   //    }
   //    if(array[i]==1)
   //    {
   //       one_count++;
   //    }
   // }

   // cout << "Number of 0's are : " << zero_count << endl ;
   // cout << "Number of 1's are : " << one_count << endl ;
   // ---------------------------------------
   // int array[]={1,0,1,1,0,1,0,0,1,1};
   // int size = 10 ;
   // int count_z = 0, count_o = 0;
   // count_z_o(array, size, count_z, count_o);
   // --------------------------------------------

   // Searching maximum number from a given array.
   // ---------------------------------------------------

   // int array[] = {1,2,11,4,9,6,7,17} ;
   // int size = 8 ;
   // int max_num = INT_MIN ;

   // for (int i=0; i<size; i++)
   // {
   //    if (array[i] > max_num)
   //    {
   //       max_num = array[i] ;
   //    }
   // }
   // cout << max_num << endl ;

   // int array[] = {1,2,4,9,5,15} ;
   // int size = 6;
   // int max_num = INT_MIN;

   // cout << maxi_num(array, size, max_num) << endl ;

   // Searching Minimum number from a given array.
   // ---------------------------------------------------
   // Test Case : a = 1,2,11,4,9,6,7,17 : Output = 1,17,2,7,11,6,4,9

   // int array[] = {1,2,11,4,9,6,7,17} ;
   // int size = 8 ;
   // int min_num = INT_MAX ;

   // for (int i=0; i<size; i++)
   // {
   //    if (array[i] < min_num)
   //    {
   //       min_num = array[i] ;
   //    }
   // }
   // cout << min_num << endl ;

   // int array[] = {1,2,4,9,5,15} ;
   // int size = 6;
   // int min_num = INT_MAX;

   // cout << mini_num(array, size, min_num) << endl ;

   // Extreme print in array.
   // -------------------------------------------------------

   // int array[] = {1,2,3,4,5,6} ;
   // int size = 6 ;

   // int start = 0 ;
   // int end = size - 1 ;

   // while(true)
   // {
   //    if(start > end)
   //    break;

   // cout << array[start] << " " ;
   // cout << array[end] << " " ;
   // start++;
   // end-- ;
   // }

   // int array[] = {1,2,3,4,5,6,7} ;
   // int size = 7 ;

   // int start = 0 ;
   // int end = size - 1 ;

   // while(true)
   // {
   //    if(start > end)
   //    break;
   //    if(start == end)
   //    {
   //       cout << array[start] << " " ;
   //    }
   //    else
   //    {
   //    cout << array[start] << " " ;
   //    cout << array[end] << " " ;
   //    }
   //    start++;
   //    end-- ;
   // }

   // Reversal of a given array using swap function
   // --------------------------------------------

   // int array[] = {1,2,3,4,5,6,7,8} ;
   // int size = 8 ;
   // int start = 0 ;
   // int end = size - 1 ;

   // while (start<=end)
   // {
   //    swap(array[start], array[end]);
   //    start++;
   //    end--;
   // }
   // for (int i=0; i<size; i++)
   // {
   //    cout << array[i] << " ";
   // }

   // int array[] = {1,2,3,4,5,6,7} ;
   // int size = 7 ;
   // int start = 0 ;
   // int end = size - 1 ;

   // while (start<=end)
   // {
   //    swap(array[start], array[end]);
   //    start++;
   //    end--;
   // }
   // for (int i=0; i<size; i++)
   // {
   //    cout << array[i] << " ";
   // }

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



   // 
   // ---------------------------------------------------

   return 0;
}

bool search_num(int array[], int size, int num)
{
   for (int i = 0; i < size; i++)
   {
      if (array[i] == num)
      {
         return true;
      }
   }
   return false;
};

int count_z_o(int array[], int size, int count_z, int count_o)
{
   for (int i = 0; i < size; i++)
   {
      if (array[i] == 0)
      {
         count_z++;
      }
      if (array[i] == 1)
      {
         count_o++;
      }
   }
   cout << "No of 0's are : " << count_z << endl;
   cout << "No of 1's are : " << count_o << endl;
};

int maxi_num(int array[], int size, int max_num)
{
   for (int i = 0; i < size; i++)
   {
      if (array[i] > max_num)
      {
         max_num = array[i];
      }
   }
   return max_num;
};

int mini_num(int array[], int size, int min_num)
{
   for (int i = 0; i < size; i++)
   {
      if (array[i] < min_num)
      {
         min_num = array[i];
      }
   }
   return min_num;
};
