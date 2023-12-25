#include <iostream>
#include <vector>

using namespace std;

int main()
{
    // Sorting array 0's, 1's & 2's
    // Color Sorting
    // ---------------------------------------------------
    // // Test Case : a = 2, 0, 2, 1, 1, 0 : Output = 0, 0, 1, 1, 2, 2;
    // int arr[] = {2, 0, 2, 1, 1, 0}, temp;
    // int size = sizeof(arr) / sizeof(int) ;

    // -------------------------------------Method 1
    // for (int j = 0; j < size; j++)
    // {
    //     for (int i = 0; i < size; i++)
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

    //
    // ---------------------------------------------------

    return 0;
}
