#include <iostream>
#include <vector>

using namespace std;

int findunique(vector<int> array);

int main()
{
    // ----------------------------------------------------
    // vector<int> array(5,0);
    // for (int i = 0; i < array.size(); i++)
    // {
    //     cout << array[i] << " " ;
    // }

    // ----------------------------------------------------
    // vector<int> array{10,20,30,40,50} ;
    // for (int i = 0; i < array.size(); i++)
    // {
    //     cout << array[i] << " " ;
    // }

    // ----------------------------------------------------
    // int n ;
    // cin >> n ;
    // vector<int> array(n);
    // for (int i = 0; i < n; i++)
    // {
    //     cin >> array[i] ;
    // }
    // for (int j = 0; j < array.size(); j++)
    // {
    //     cout << array[j] << " ";
    // }

    // ----------------------------------------------------
    // vector<int> array(5);
    // array.push_back(1);
    // array.push_back(2);
    // array.push_back(3);
    // array.push_back(4);
    // array.push_back(5);
    // cout << array.size() << endl;
    // cout << array.capacity() << endl;
    // cout << array.empty() << endl;
    // for (int i = 0; i < array.size(); i++)
    // {
    //     cout << array[i] << " ";
    // }
    // array.pop_back();
    // cout << endl << array.size() << endl;
    //     for (int i = 0; i < array.size(); i++)
    // {
    //     cout << array[i] << " " ;
    // }

    // Finding Unique Element from Array
    // -----------------------------------------------------------------------------
    // Test Case : Input : array[] = {1,2,3,4,5,6,5,3,4,2,1}
    // Test Case : Output : 6

    // vector<int> array{1, 2, 3, 4, 5, 6, 5, 3, 4, 2, 1};
    // --------------------------- Without Function
    // int ans = 0;
    // for (int i = 0; i < array.size(); i++)
    // {
    //     ans = ans ^ array[i];
    // }
    // cout << ans;
    // --------------------------- With Function
    // int uniq_element = findunique(array);
    // cout << uniq_element;

    // Union Of two Arrays
    // -----------------------------------------------------------------------------
    // Test Case : Input : arr[] = {1,2,3,4}, brr[] = {5,6,7,8}
    // Test Case : Output : 1,2,3,4,5,6,7,8

    // vector<int> arr{1, 2, 3, 4};
    // vector<int> brr{5, 6, 7, 8};
    // vector<int> ans;
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     ans.push_back(arr[i]);
    // }
    // for (int i = 0; i < brr.size(); i++)
    // {
    //     ans.push_back(brr[i]);
    // }
    // cout << ans.size() << endl;
    // for (int i = 0; i < ans.size(); i++)
    // {
    //     cout << ans[i] << " ";
    // }

    // Intersection of Two Arrays
    // -----------------------------------------------------------------------------
    // Test Case : Input : arr[] = {1,2,3,4,5}, brr[] = {5,6,7,8,9}
    // Test Case : Output : 5

    // vector<int> arr{1, 2, 3, 4, 5};
    // vector<int> brr{5, 6, 7, 8, 9};

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

    // Pair SUM // Two SUM
    // -----------------------------------------------------------------------------

    // vector<int> arr{1, 2, 3, 4, 5, 6, 7, 8};
    // int sum = 8;
    // -------------------Method 1 -------------------
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     for (int j = arr[i + 1]; j < arr.size(); j++)
    //     {
    //         if (arr[i] + arr[j] == sum)
    //         {
    //             cout << arr[i] << "," << arr[j] << endl;
    //         }
    //     }
    // }
    // -------------------Method 2 -------------------
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     for (int j = arr[i + 1]; j < arr.size(); j++)
    //     {
    //         if (sum - arr[i] == arr[j])
    //         {
    //             cout << arr[i] << "," << arr[j] << endl;
    //         }
    //     }
    // }

    // Triplet Sum // Three SUM
    // -----------------------------------------------------------------------------

    // vector<int> arr{1, 2, 3, 4, 5, 6, 7, 8, 9};
    // int sum = 9;

    // for (int i = 0; i < arr.size(); i++)
    // {
    //     for (int j = arr[i + 1]; j < arr.size(); j++)
    //     {
    //         for (int k = arr[j + 1]; k < arr.size(); k++)
    //         {
    //             if (arr[i] + arr[j] + arr[k] == sum)
    //             {
    //                 cout << arr[i] << "," << arr[j] << "," << arr[k] << endl;
    //             }
    //         }
    //     }
    // }

    // Four Sum
    // -----------------------------------------------------------------------------
    // Input: nums = [1,0,-1,0,-2,2], target = 0
    // Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

    // vector<int> nums{1, 0, -1, 0, -2, 2};
    // int target = 0;

    // for (int i = 0; i < nums.size(); i++)
    // {
    //     for (int j = i + 1; j < nums.size(); j++)
    //     {
    //         for (int k = j + 1; k < nums.size(); k++)
    //         {
    //             for (int l = k + 1; l < nums.size(); l++)
    //             {
    //                 if (nums[i] + nums[j] + nums[k] + nums[l] == target)
    //                 {
    //                     cout << nums[i] << ", " << nums[j] << ", " << nums[k] << ", " << nums[l] << endl;
    //                 }
    //             }
    //         }
    //     }
    // }
    // ************************************************************************************************************************************
    // Sort 0's and 1's in Array
    // -----------------------------------------------------------------------------

    // vector<int> arr{0, 0, 0, 1, 1, 0};
    // int start = 0, end = arr.size() - 1;
    // for (int i = 0; i < arr.size(); i++)
    // {
    //     if (arr[i] == 1)
    //     {
    //         swap(arr[i], arr[end]);
    //         end--;
    //     }

    //     if (arr[i] == 0)
    //     {
    //         swap(arr[i], arr[start]);
    //         start++;
    //     }

    // }

    // for (int i = 0; i < arr.size(); i++)
    // {
    //     cout << arr[i] << " " ;
    // }
    // ***********************************************************************************************
    // int i = 0;
    // while (i != end)
    // {
    //     if (arr[i] == 0)
    //     {
    //         swap(arr[i], arr[start]);
    //         start++;
    //         i++;
    //     }
    //     if (arr[i] == 1)
    //     {
    //         swap(arr[i], arr[end]);
    //         end--;

    //     }
    // }
    // for (i = 0; i < arr.size(); i++)
    // {
    //     cout << arr[i] << " ";
    // }
    // *****************************************************************************************************************
    // Left Rotate an array by one element
    // -----------------------------------------------------------------------------
    // Majority element in array
    // -----------------------------------------------------------------------------
    // Buy and Sell Stock
    // -----------------------------------------------------------------------------
    // ----------------------------------------------------






    return 0;
}

int findunique(vector<int> array)
{
    int ans = 0;
    for (int i = 0; i < array.size(); i++)
    {
        ans = ans ^ array[i];
    }
    return ans;
};