#include <iostream>
#include <limits.h>
#include <vector>

using namespace std;

void row_sum(int arr[][3], int row, int col);
void col_sum(int arr[][3], int row, int col);
bool num_search(int arr[][3], int row, int col, int num);
int max_search(int arr[][3], int row, int col, int max);
int min_search(int arr[][3], int row, int col, int min);

int main()
{
    // Row Sum Printing
    // ----------------------------------------------------
    // -------------------------------Without Function
    // int arr[2][3] = {{1, 2, 3}, {4, 5, 6}}, row = 2, col = 3;
    // for (int i = 0; i < row; i++)
    // {
    //     int Sum = 0;
    //     for (int j = 0; j < col; j++)
    //     {
    //         Sum = Sum + arr[i][j];
    //     }
    //     cout << Sum << " ";
    // }

    // Column Sum Printing
    // ----------------------------------------------------
    // int arr[2][3] = {{1, 2, 3}, {4, 5, 6}}, row = 2, col = 3;
    // for (int j = 0; j < col; j++)
    // {
    //     int Sum = 0;
    //     for (int i = 0; i < row; i++)
    //     {
    //         Sum = Sum + arr[i][j];
    //     }
    //     cout << Sum << " ";
    // }

    // -------------------------------With Function
    // int arr[2][3] = {{1, 2, 3}, {4, 5, 6}}, row = 2, col = 3;
    // row_sum(arr, row, col);
    // cout << endl;
    // col_sum(arr, row, col);

    // Linear Search
    // ----------------------------------------------------
    // int arr[2][3] = {{1, 2, 3}, {4, 5, 6}}, row = 2, col = 3, num = 6;

    // -------------------------------Without Function
    // for (int i = 0; i < row; i++)
    // {
    //     for (int j = 0; j < col; j++)
    //     {
    //         if (arr[i][j] == num)
    //         {
    //             cout << "Found";
    //         }
    //     }
    // }

    // -------------------------------With Function
    // cout << num_search(arr, row, col, num);

    // Search Maximum and minimum Number
    // ----------------------------------------------------
    // int arr[2][3] = {{1, 2, 3}, {4, 5, 6}}, row = 2, col = 3;
    // int min = INT_MAX, max = INT_MIN;

    // -------------------------------Without Function
    // for (int i = 0; i < row; i++)
    // {
    //     for (int j = 0; j < col; j++)
    //     {
    //         if (arr[i][j] < min)
    //         {
    //             min = arr[i][j];
    //         }
    //         if (arr[i][j] > max)
    //         {
    //             max = arr[i][j];
    //         }
    //     }
    // }
    // cout << max << " " << min;

    // -------------------------------With Function
    // cout << max_search(arr, row, col, max) << endl;
    // cout << min_search(arr, row, col, min) << endl;

    // Transpose a Matrix
    // ----------------------------------------------------
    // int arr[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, row = 3, col = 3;
    // for (int i = 0; i < row; i++)
    // {
    //     for (int j = 0; j < col; j++)
    //     {
    //         cout << arr[i][j] << " ";
    //     }
    //     cout << endl;
    // }
    // int brr[3][3];
    // for (int i = 0; i < row; i++)
    // {
    //     for (int j = 0; j < col; j++)
    //     {
    //         brr[j][i] = arr[i][j];
    //     }
    //     cout << endl;
    // }

    // for (int i = 0; i < row; i++)
    // {
    //     for (int j = 0; j < col; j++)
    //     {
    //         cout << brr[i][j] << " ";
    //     }
    //     cout << endl;
    // }

    // ***********************************************************************************************
    // Multi Dynamic array - Vector of vector
    // ----------------------------------------------------

    // int row, col;
    // cout << "Enter the number of rows and columns: ";
    // cin >> row >> col;
    // vector<vector<int>> arr(row, vector<int>(col, -8));
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     for (int j = 0; j < arr[i].size(); j++)
    //     {
    //         cout << arr[i][j] << " ";
    //     }
    //     cout << endl;
    // }

    // -------------------------------------Method 1
    // Sort 0's, 1's & 2's
    // ----------------------------------------------------
    // // Test Case : a = 2, 0, 2, 1, 1, 0 : Output = 0, 0, 1, 1, 2, 2;
    // int arr[] = {2, 0, 2, 1, 1, 0}, temp;
    // for (int j = 0; j < 6; j++)
    // {
    //     for (int i = 0; i < 6; i++)
    //     {
    //         if (arr[i] > arr[i + 1])
    //         {
    //             temp = arr[i];
    //             arr[i] = arr[i + 1];
    //             arr[i + 1] = temp;
    //         }
    //     }
    // }

    // for (int i = 0; i < 6; i++)
    // {
    //     cout << arr[i] << " ";
    // }

    // -------------------------------------Method 2
    // vector<int> arr{2, 0, 2, 1, 1, 0};
    // int left = 0, i = 0, right = arr.size() - 1;
    // while (i <= right)
    // {
    //     if (arr[i] == 0)
    //     {
    //         swap(arr[i], arr[left]);
    //         left++;
    //         i++;
    //     }
    //     else if (arr[i] == 2)
    //     {
    //         swap(arr[i], arr[right]);
    //         right--;
    //     }
    //     else
    //     {
    //         i++;
    //     }
    // }

    // for (int i = 0; i < arr.size(); i++)
    // {
    //     cout << arr[i] << " ";
    // }

    // Move all -ve no to one side of array
    // ----------------------------------------------------
    // vector<int> arr{1, 2, -3, 4, -5, 6};
    // int left = 0, right = arr.size() - 1;
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     if (arr[i] < 0)
    //     {
    //         swap(arr[i], arr[left]);
    //         left++;
    //     }
    // }
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     cout << arr[i] << " ";
    // }

    // Find Duplicate Element
    // ----------------------------------------------------
    // -------------------------Time Complexity is very high--
    // vector<int> arr{1, 2, 3, 4, 6, 3};
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     for (int j = i + 1; j < arr.size(); j++)
    //     {
    //         if (arr[i] == arr[j])
    //         {
    //             cout << arr[i] << " ";
    //             break;
    //         }
    //     }
    // }

    // Find mising Element
    // ----------------------------------------------------

    // Find first repeating element
    // ----------------------------------------------------
    // --------------------------High Complexity-
    // vector<int> arr{10, 5, 3, 4, 3, 5, 6};
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     for (int j = i+1; j < arr.size(); j++)
    //     {
    //         if (arr[i] == arr[j])
    //     {
    //         cout << arr[i];
    //         break;
    //     }
    //     }        
    // }
    

    // Find common element in 3 arrays
    // ----------------------------------------------------

    // Factorial of Large number
    // ----------------------------------------------------

    return 0;
}

void row_sum(int arr[][3], int row, int col)
{

    for (int i = 0; i < row; i++)
    {
        int Sum = 0;
        for (int j = 0; j < col; j++)
        {
            Sum = Sum + arr[i][j];
        }
        cout << Sum << " ";
    }
};

void col_sum(int arr[][3], int row, int col)
{

    for (int j = 0; j < col; j++)
    {
        int Sum = 0;
        for (int i = 0; i < row; i++)
        {
            Sum = Sum + arr[i][j];
        }
        cout << Sum << " ";
    }
};

bool num_search(int arr[][3], int row, int col, int num)
{
    for (int i = 0; i < row; i++)
    {
        for (int j = 0; j < col; j++)
        {
            if (arr[i][j] == num)
            {
                return true;
            }
        }
    }

    return false;
};

int max_search(int arr[][3], int row, int col, int max)
{
    for (int i = 0; i < row; i++)
    {
        for (int j = 0; j < col; j++)
        {
            if (arr[i][j] > max)
            {
                max = arr[i][j];
            }
        }
    }
    return max;
};

int min_search(int arr[][3], int row, int col, int min)
{
    for (int i = 0; i < row; i++)
    {
        for (int j = 0; j < col; j++)
        {
            if (arr[i][j] < min)
            {
                min = arr[i][j];
            }
        }
    }
    return min;
};
