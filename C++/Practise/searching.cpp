#include <iostream>
#include <algorithm>
#include <limits.h>
#include <vector>

using namespace std;

int binary(vector<int> arr);

int main()
{
    // vector<int> arr{1, 2, 3, 4, 5, 6, 7, 8, 9};

    // ---------------------------------------------------------------------
    // int start = 0, end = arr.size() - 1, mid = (start + end) / 2, key;
    //  cin >> key;

    //  while (start <= end)
    //  {
    //     if (arr[mid] == key)
    //     {
    //         cout << mid;
    //     }
    //     if (arr[mid] > key)
    //     {
    //         end = mid - 1;
    //     }
    //     else
    //     {
    //         start = mid + 1;
    //     }

    //     mid = (start + end) / 2;
    //  }

    // ------------------------------------------------------------------
    // cout << binary(arr);

    // -------------------------------------------------------------------
    // int key;
    // cin >> key;
    // if (binary_search(arr.begin(), arr.end(), key))
    // {
    //     cout << "Found";
    // }
    // -------------------------------------------------------------------




    // -------------------------------------------------------------------
    return 0;
}

int binary(vector<int> arr)
{
    int s = 0, e = arr.size() - 1, m = (s + e) / 2, key;
    cin >> key;
    while (s <= e)
    {
        if (arr[m] == key)
        {
            return m;
        }
        if (arr[m] > key)
        {
            e = m - 1;
        }
        else
        {
            s = m + 1;
        }

        m = (s + e) / 2;
    }
    return -1;
};






























class Solution {
public:

int binary_search(vector<int> arr, int s, int e, int target)
{
    int m = s + (e - s) / 2;

    while (s <= e)
    {
        if (arr[m] == target)
        {
            return m;
        }
        else if (arr[m] > target)
        {
            e = m - 1;
        }
        else if (arr[m] < target)
        {
            s = m + 1;
        }
        m = s + (e - s) / 2;
    }
   return -1; 
};

int pivot(vector<int> arr)
{
    int s = 0, e = arr.size() - 1, m = s + (e - s) / 2;

    while (s < e)
    {
        if(m + 1 < arr.size() && arr[m] > arr[m + 1])
        {
            return m;
        }
        else if(m - 1 >= 0 && arr[m - 1] > arr[m])
        {
            return m - 1;
        }
        else if(arr[s] >= arr[m])
        {
            e = m - 1;
        }
        else if(arr[s] <= arr[m])
        {
            s = m;
        }
        m = s + (e - s) / 2;
    }
    return s;
};
    int search(vector<int>& nums, int target) {
        int ans = pivot(nums);
        if (target >= nums[0] && target <= nums[ans])
        {
            int res = binary_search(nums, 0, ans, target);
            return res;
        }
        if (ans + 1 < nums.size() && target >= nums[ans + 1] && target <= nums[nums.size() - 1])
        {
            int res = binary_search(nums, ans + 1, nums.size() - 1, target);
            return res;
        }
        return -1;
    }
};