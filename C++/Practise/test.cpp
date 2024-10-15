// This folder is to test and run doubtful proograms and checking it.

#include <iostream>
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <limits.h>
#include <vector>

using namespace std;
int main()
{
    /*This program is to print Hello world! */
    cout << "Hello World!" << endl;

    //======================================================================== ARRAYS

    //================================================== SEARCHING

    //======================== Linear Search

    // ---------------- Searching any number linearly traversing

    // int arr[5] = {1, 2, 3, 4, 5};
    // int target = 3;

    // for (int i = 0; i < 5; i++)
    // {
    //     if (arr[i] == target)
    //     {
    //         cout << "Found" << endl;
    //     }
    // }

    // ---------------- Counting Number of 0's and 1's
    // int arr[10] = {0, 1, 0, 1, 0};
    // int count0 = 0, count1 = 0;
    // for (int i = 0; i < 10; i++)
    // {
    //     if (arr[i] == 0)
    //         count0++;
    //     else
    //         count1++;
    // }
    // cout << "Number of 0's: " << count0 << endl;
    // cout << "Number of 1's: " << count1 << endl;

    // ---------------- Searching Maximum Number

    // int max_num = INT_MIN, arr[] = {1, 2, 3, 4, 5, 6};

    // for (int i = 0; i < 6; i++)
    // {
    //     if (arr[i] > max_num)
    //     {
    //         max_num = arr[i];
    //     }
    // }
    // cout << "Max Number is : " << max_num << endl;

    // ---------------- Searching Minimum Number

    // int min_num = INT_MAX, arr[] = {1, 2, 3, 4, 5, 6};

    // for (int i = 0; i < 6; i++)
    // {
    //     if (arr[i] < min_num)
    //     {
    //         min_num = arr[i];
    //     }
    // }
    // cout << "Min Number is : " << min_num << endl;

    // ---------------- Extreme print in Array
    // Output : 1 6 2 5 3 4  Input : 1 2 3 4 5 6

    // int arr[6] = {1, 2, 3, 4, 5, 6}, start = 0, end = 5;

    // while (true)
    // {
    //     if (start > end)
    //         break;

    //     if (start == end)
    //     {
    //         cout << arr[start] << " ";
    //     }
    //     else
    //     {
    //         cout << arr[start] << " ";
    //         cout << arr[end] << " ";
    //     }
    //     start++;
    //     end--;
    // }

    // ---------------- Reversal of Array

    // Using Swap Function
    // int arr[] = {1, 2, 3, 4, 5}, start = 0, end = 4;

    // while (start <= end)
    // {
    //     swap(arr[start], arr[end]);
    //     start++;
    //     end--;
    // }
    // for (int i = 0; i < 5; i++)
    // {
    //     cout << arr[i] << " ";
    // }

    // Without Using Swap Function
    // int arr[] = {1, 2, 3, 4, 5}, start = 0, end = 4, temp;
    // while (start <= end)
    // {
    //     temp = arr[start];
    //     arr[start] = arr[end];
    //     arr[end] = temp;
    //     start++;
    //     end--;
    // }
    // for (int i = 0; i < 5; i++)
    // {
    //     cout << arr[i] << " " ;
    // }

    // ------------------------------------------ Vectors - Dynamic Arrays
    // ---------------- Searching Unique Element from array

    // vector<int> arr{1, 2, 3, 2, 1};
    // int ans = 0;

    // for (int i = 0; i < arr.size(); i++)
    // {
    //     ans = ans ^ arr[i];
    // }
    // cout << ans;

    // ---------------- Union of two arrays

    // vector<int> arr{1, 2, 3, 4}, brr{5, 6, 7, 8}, ans;

    // for (int i = 0; i < arr.size(); i++)
    // {
    //     ans.push_back(arr[i]);
    // }
    // for (int i = 0; i < brr.size(); i++)
    // {
    //     ans.push_back(brr[i]);
    // }
    // for (int i = 0; i < ans.size(); i++)
    // {
    //     cout << ans[i] << " ";
    // }

    // ---------------- Intersection of two arrays

    // vector<int> arr{1, 2, 3, 4}, brr{3, 4, 5, 6};
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     for (int j = 0; j < brr.size(); j++)
    //     {
    //         if (arr[i] == brr[j])
    //         {
    //             cout << arr[i] << " ";
    //             break;
    //         }
    //     }
    // }

    // ---------------- Pair Sum / Two Sum
    // vector<int> arr{1, 2, 3, 4, 5, 6, 7, 8};
    // int sum = 6;

    // for (int i = 0; i < arr.size(); i++)
    // {
    //     for (int j = 0; j < arr.size(); j++)
    //     {
    //         if (arr[i] + arr[j] == sum)
    //         {
    //             cout << arr[i] << " " << arr[j] << endl;
    //         }
    //     }
    // }

    // ---------------- Three Sum / Triple Sum

    // vector<int> arr{1, 2, 3, 4, 5, 6, 7, 8};
    // int sum = 9;

    // for (int i = 0; i < arr.size(); i++)
    // {
    //     for (int j = 0; j < arr.size(); j++)
    //     {
    //         for (int k = 0; k < arr.size(); k++)
    //         {
    //             if (arr[i] + arr[j] + arr[k] == sum)
    //             {
    //                 cout << arr[i] << " " << arr[j] << " " << arr[k] << endl;
    //             }
    //         }
    //     }
    // }

    // ---------------- Searching Unique Element from array
































    return 0;
}