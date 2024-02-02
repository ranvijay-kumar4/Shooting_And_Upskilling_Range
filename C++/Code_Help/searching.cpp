#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

bool search_num(int array[], int size, int num);
int count_z_o(int array[], int size, int count_z, int count_o);
int maxi_num(int array[], int size, int max_num);
int mini_num(int array[], int size, int min_num);
int binary_search(int arr[], int size, int key);
int binary__search(vector<int> arr, int s, int e, int key);
int low_bound(vector<int> arr, int k);
int up_bound(vector<int> arr, int k);
int pivot(vector<int> arr);
int nrly_sorted(vector<int> arr, int key);
int division(int dividend, int divisor);

int main()
{

    // ----------------------------------------------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------LINEAR SEARCH---------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------
    // Searching any number in the given array
    // -----------------------------------------------------
    // ----------------------Without Using Function
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

    // ----------------------By Using Function
    // int array[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    // int size = 9;
    // int num = 11;

    // if (search_num(array, size, num))
    // {
    //     cout << "Found";
    // }
    // else
    // {
    //     cout << "Not Found";
    // }

    // --------------------------------------------------------------------------
    // Counting Numbers of 0's and 1's in the array.
    // ---------------------------------Without Function
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
    
    // ---------------------------------------With Function
    // int array[]={1,0,1,1,0,1,0,0,1,1};
    // int size = 10 ;
    // int count_z = 0, count_o = 0;
    // count_z_o(array, size, count_z, count_o);
    // --------------------------------------------

    // --------------------------------------------------------------------------
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

    // --------------------------------------------------------------------------
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

    // --------------------------------------------------------------------------
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

    // ----------------------------------------------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------BINARY SEARCH---------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------
    // Searching any number in the given array
    // -----------------------------------------------------
    // ----------------------Without Using Function
    // int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9}, key = 19;
    // int start = 0, end = 8, mid = (start + end) / 2;
    // while (start <= end)
    // {
    //     if (arr[mid] == key)
    //     {
    //         cout << mid;
    //     }
    //     if (key > arr[mid])
    //     {
    //         start = mid + 1;
    //     }
    //     else
    //     {
    //         end = mid - 1;
    //     }

    //     mid = (start + end) / 2;
    // }

    // ----------------------By Using Function
    // int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9}, key = 9;
    // cout << binary_search(arr, 8, key);

    // ----------------------By Using Inbuilt Function
    // vector<int> arr{1, 2, 3, 4, 5, 6, 7, 8, 9};
    // int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9}, size = 8;

    // if (binary_search(arr, arr + size, 7))
    // {
    //     cout << "Found" << endl;
    // }
    // else
    // {
    //     cout << "Not Found" << endl;
    // }

    // if (binary_search(arr.begin(), arr.end(), 3))
    // {
    //     cout << "Found";
    // }
    // else
    // {
    //     cout << "Not Found";
    // }

    // --------------------------------------------------------------------------
    // First Occurance of a number in the given array
    // -----------------------------------------------------

    // vector<int> arr{1, 2, 3, 3, 4, 5, 6};
    // int key, ans = -1, s = 0, e = arr.size() - 1, m = (s + e) / 2;
    // cin >> key;
    // while (s <= e)
    // {
    //     if (arr[m] == key)
    //     {
    //         ans = m;
    //         e = m - 1;
    //     }
    //     if (arr[m] > key)
    //     {
    //         e = m - 1;
    //     }
    //     else if (arr[m] < key)
    //     {
    //         s = m + 1;
    //     }
    //     m = (s + e) / 2;
    // }

    // cout << ans;

    // ----------------------By Using Inbuilt Function
    // auto ans = lower_bound(arr.begin(), arr.end(), 3);
    // cout << ans - arr.begin();

    // --------------------------------------------------------------------------
    // Last Occurance of a number in the given array
    // -----------------------------------------------------

    // vector<int> arr{1, 2, 3, 4, 5, 6, 6, 6};
    // int s = 0, e = arr.size() - 1, m = (s + e) / 2, ans = -1, k;
    // cin >> k;
    // while (s <= e)
    // {
    //     if (arr[m] == k)
    //     {
    //         ans = m;
    //         s = m + 1;
    //     }
    //     else if (arr[m] > k)
    //     {
    //         e = m - 1;
    //     }
    //     else if (arr[m] < k)
    //     {
    //         s = m + 1;
    //     }
    //     m = (s + e) / 2;
    // }
    // cout << ans;

    // ----------------------By Using Inbuilt Function

    // auto ans = upper_bound(arr.begin(), arr.end(), 6);
    // cout << ans - arr.begin();

    // --------------------------------------------------------------------------
    // Total Occurence
    // -----------------------------------------------------
    // vector<int> arr{1, 2, 3, 3, 4, 4, 5};
    // int k = 4;

    // cout << "Lower Bound : " << low_bound(arr, k) << endl;

    // cout << "Upper Bound : " << up_bound(arr, k) << endl;

    // cout << "Total Occurrence : " << up_bound(arr, k) - low_bound(arr, k) + 1 << endl;

    // --------------------------------------------------------------------------
    //  Peak element in a Mountain array
    // -----------------------------------------------------

    // vector<int> arr{0, 10, 11, 2};
    // int s = 0, e = arr.size() - 1, m = (s + e) / 2;
    // while (s < e)
    // {
    //     if (arr[m] < arr[m + 1])
    //     {
    //         s = m + 1;
    //     }
    //     else
    //     {
    //         e = m;
    //     }

    //     m = (s + e) / 2;
    // }

    // cout << s;

    // --------------------------------------------------------------------------
    // Find the missing element
    // -----------------------------------------------------
    //  vector<int> arr {1, 2, 3, 4, 6, 7, 8};
    // int s = 0, e = arr.size() - 1, m = (s + e) / 2;

    // while (s <= e)
    // {
    //     if (arr[m] == m + 1)
    //     {
    //         s = m;
    //     }
    //     if (arr[m] > m + 1)
    //     {
    //         e = m;
    //     }

    // }

    // --------------------------------------------------------------------------
    // Pivot element
    // -----------------------------------------------------

    // ------------------------------------------Without Function
    // vector<int> arr{3, 4, 5, 6, 7, 8, 1, 2};
    // int s = 0, e = arr.size() - 1, m = s + (e - s) / 2;

    // while (s <= e)
    // {
    //     if (m + 1 < arr.size() && arr[m] > arr[m + 1])
    //     {
    //         cout << m << endl;
    //         break;
    //     }
    //     else if (m - 1 >= 0 && arr[m - 1] > arr[m])
    //     {
    //         cout << m - 1 << endl;
    //         break;
    //     }
    //     else if (arr[s] > arr[m])
    //     {
    //         e = m - 1;
    //     }
    //     else if (arr[s] < arr[m])
    //     {
    //         s = m + 1;
    //     }
    //     m = s + (e - s) / 2;
    // }

    // ------------------------------------------With Function
    // vector<int> arr{3, 4, 5, 6, 7, 8, 1, 2};
    // cout << pivot(arr);

    // --------------------------------------------------------------------------
    // Search in Rotated Sorted Array
    // -----------------------------------------------------

    // Test Case : Input: nums = [4,5,6,7,0,1,2], target = 0 -- Output: 4
    // vector<int> arr{4, 5, 6, 7, 0, 1, 2};
    // int key = 0;
    // int ans = pivot(arr);
    // if (key >= arr[0] && key <= arr[ans])
    // {
    //     int res = binary__search(arr, 0, ans, key);
    //     cout << res;
    // }
    // else if (key >= arr[ans + 1] && key <= arr[arr.size() - 1])
    // {
    //     int res = binary__search(arr, ans + 1, arr.size() - 1, key);
    //     cout << res;
    // }
    // else
    // {
    //     cout << -1;
    // }

    // --------------------------------------------------------------------------
    // Finding Square Root of any number.
    // -----------------------------------------------------
    // vector<int> arr{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    // int s = 0, e = arr.size() - 1, m = s + (e - s) / 2, key = 10;
    // double precision, step = 0.1, ans;
    // cin >> precision;
    // while (s <= e)
    // {
    //     if (m * m == key)
    //     {
    //         ans = m;
    //         break;
    //     }
    //     else if (m * m > key)
    //     {
    //         e = m - 1;
    //     }
    //     else if (m * m < key)
    //     {
    //         ans = m;
    //         s = m + 1;
    //     }

    //     m = s + (e - s) / 2;
    // }

    // for (double i = 0; i < precision; i++)
    // {
    //     for (double j = ans; j * j <= key; j = j + step)
    //     {
    //         ans = j;
    //     }
    //     step = step / 10;
    // }

    // cout << ans;

    // --------------------------------------------------------------------------
    // Binary Search on 2D array/Vector.
    // -----------------------------------------------------
    // arr[5][4] {{1,2,3,4}{5,6,7,8}{1,2,3,4}{5,6,7,8}{1,2,3,4}}
    // row = mid/cols
    // c*i+j
    // col = mid%cols
    // arr[row][col]<target == RS
    // arr[row][col]>target == LS

    // int arr[5][4] = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}, {17, 18, 19, 20}};
    // int row = 5, rowIndx, colIndx, col = 4, s = 0, e = row * col - 1, m = s + (e - s) / 2, key = 19;
    // while (s <= e)
    // {
    //     rowIndx = m / col;
    //     colIndx = m % col;

    //     if (arr[rowIndx][colIndx] == key)
    //     {
    //         cout << rowIndx << " " << colIndx << endl;
    //         break;
    //     }
    //     else if (arr[rowIndx][colIndx] < key)
    //     {
    //         s = m + 1;
    //     }
    //     else if (arr[rowIndx][colIndx] > key)
    //     {
    //         e = m - 1;
    //     }
    //     else
    //     {
    //         cout << -1;
    //     }

    //     m = s + (e - s) / 2;
    // }

    // --------------------------------------------------------------------------
    // Binary Search in a Nearly Sorted array.
    // -----------------------------------------------------

    // ------------------------------------------Without Function
    // vector<int> arr{10, 3, 40, 20, 50, 80, 70};
    // int s = 0, e = arr.size() - 1, m = s + (e - s) / 2, key = 10;

    // while (s <= e)
    // {
    //     if (arr[m] == key)
    //     {
    //         cout << m;
    //         break;
    //     }
    //     else if (arr[m - 1] == key)
    //     {
    //         cout << m - 1;
    //         break;
    //     }
    //     else if (arr[m + 1] == key)
    //     {
    //         cout << m + 1;
    //         break;
    //     }
    //     else if (arr[m] > key)
    //     {
    //         e = m - 2;
    //     }
    //     else if (arr[m] < key)
    //     {
    //         s = m + 2;
    //     }
    //     m = s + (e - s) / 2;
    // }

    // ------------------------------------------With Function
    // vector<int> arr{10, 3, 40, 20, 50, 80, 70};
    // int key = 20;
    // cout << nrly_sorted(arr, key);

    // --------------------------------------------------------------------------
    // Divide two numbers using binary search
    // -----------------------------------------------------

    // ------------------------------------------Without Function
    // int dividend = 22, divisor = -7, ans = 0, s = 0, e = dividend, m = s + (e - s) / 2;
    // while (s <= e)
    // {
    //     if (abs(m * divisor) == abs(dividend))
    //     {
    //         ans = m;
    //         break;
    //     }
    //     else if (abs(m * divisor) > abs(dividend))
    //     {
    //         e = m - 1;
    //     }
    //     else if (abs(m * divisor) < abs(dividend))
    //     {
    //         ans = m;
    //         s = m + 1;
    //     }

    //     m = s + (e - s) / 2;
    // }
    // if (dividend < 0 && divisor < 0 || dividend > 0 && divisor > 0)
    // {
    //     cout << ans;
    // }
    // else
    // {
    //     cout << -ans;
    // }

    // ------------------------------------------With Function
    // cout << division(dividend, divisor);

    // --------------------------------------------------------------------------
    // --------------------------------------------------------------------------

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

int binary_search(int arr[], int size, int key)
{
    int start = 0;
    int end = size - 1;
    int mid = (start + end) / 2;

    while (start <= end)
    {
        if (arr[mid] == key)
        {
            return mid;
        }
        if (key > arr[mid])
        {
            start = mid + 1;
        }
        else
        {
            end = mid - 1;
        }

        mid = (start + end) / 2;
    }
    return -1;
};

int binary__search(vector<int> arr, int s, int e, int key)
{
    int mid = (s + e) / 2;

    while (s <= e)
    {
        if (arr[mid] == key)
        {
            return mid;
        }
        if (key > arr[mid])
        {
            s = mid + 1;
        }
        else
        {
            e = mid - 1;
        }

        mid = (s + e) / 2;
    }
    return -2;
};

int low_bound(vector<int> arr, int k)
{
    int s = 0, e = arr.size() - 1, m = (s + e) / 2, a = -1;
    while (s <= e)
    {
        if (arr[m] == k)
        {
            a = m;
            e = m - 1;
        }
        else if (arr[m] > k)
        {
            e = m - 1;
        }
        else if (arr[m] < k)
        {
            s = m + 1;
        }

        m = (s + e) / 2;
    }

    return a;
};

int up_bound(vector<int> arr, int k)
{
    int s = 0, e = arr.size() - 1, m = (s + e) / 2, b = -1;
    while (s <= e)
    {
        if (arr[m] == k)
        {
            b = m;
            s = m + 1;
        }
        else if (arr[m] > k)
        {
            e = m - 1;
        }
        else if (arr[m] < k)
        {
            s = m + 1;
        }

        m = (s + e) / 2;
    }

    return b;
};

int pivot(vector<int> arr)
{
    int s = 0, e = arr.size() - 1, m = s + (e - s) / 2;

    while (s < e)
    {
        if (m + 1 < arr.size() && arr[m] > arr[m + 1])
        {
            return m;
        }
        else if (m - 1 >= 0 && arr[m - 1] > arr[m])
        {
            return m - 1;
        }
        else if (arr[s] >= arr[m])
        {
            e = m - 1;
        }
        else if (arr[s] <= arr[m])
        {
            s = m;
        }
        m = s + (e - s) / 2;
    }
    return s;
};

int nrly_sorted(vector<int> arr, int key)
{
    int s = 0, e = arr.size() - 1, m = s + (e - s) / 2;

    while (s <= e)
    {
        if (arr[m] == key)
        {
            return m;
        }
        else if (arr[m + 1] == key)
        {
            return m + 1;
        }
        else if (arr[m - 1] == key)
        {
            return m - 1;
        }
        else if (arr[m] > key)
        {
            e = m - 2;
        }
        else if (arr[m] < key)
        {
            s = m + 2;
        }
        m = s + (e - s) / 2;
    }
    return -1;
};

int division(int dividend, int divisor)
{
    int s = 0, e = dividend, m = s + (e - s) / 2;
};