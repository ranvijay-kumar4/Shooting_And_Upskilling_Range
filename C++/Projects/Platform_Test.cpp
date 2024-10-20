#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
#include <limits>

using namespace std;

int expandIndex(string s, int left, int right)
{
    int count = 0;
    while (left >= 0 && right < s.length() && s[left] == s[right])
    {
        count++;
        left--;
        right++;
    }
    return count;
};

int main()
{

    cout << "Hello User" << endl;

    // -------------------------------------------------------------------------------------------------

    // GFG Pattern Printing Question

    // Input : N = 3
    // Output : * ** ***

    // int N = 2;
    // for (int i = 1; i <= N; i++)
    // {
    //     for (int j = 1; j <= i; j++)
    //     {
    //         cout << "*";
    //     }
    //     cout << " ";
    // }

    // -------------------------------------------------------------------------------------------------

    // GFG Rearrange the array

    // Input: arr[] = [1, 2, 3, 4]
    // Output: [1, 4, 2, 3]

    // int arr[] = {1, 9, 2, 8, 3, 7, 4, 6, 5};
    // int i = 0, j = 8;
    // sort(arr, arr + 9);
    // while (i <= j)
    // {
    //     if (i != j)
    //     {
    //         cout << arr[i] << " " << arr[j] << " ";
    //         i++;
    //         j--;
    //     }
    //     else
    //     {
    //         cout << arr[i] << " ";
    //         i++;
    //     }
    // }

    // -------------------------------------------------------------------------------------------------

    // Removing Duplicate elements of string leetcode question 1047
    // string ans = "", s = "abbaca";
    // int i = 0;
    // while (i < s.length())
    // {

    //  --------------------------------------------Method 1

    // if (ans.length() > 0)
    // {
    //     if (ans[ans.length() - 1] == s[i])
    //     {
    //         ans.pop_back();
    //     }
    //     else
    //     {
    //         ans.push_back(s[i]);
    //     }
    // }
    // else
    // {
    //     ans.push_back(s[i]);
    // }
    // i++;

    //  --------------------------------------------Method 2
    //     if (ans.length() > 0 && ans[ans.length() - 1] == s[i])
    //     {
    //         ans.pop_back();
    //     }
    //     else
    //     {
    //         ans.push_back(s[i]);
    //     }
    //     i++;
    // }
    // cout << ans;

    // -------------------------------------------------------------------------------------------------

    // Finding Palindromic SubString leetcode question 647

    // string s = "abc";
    // int count = 0, n = s.length();

    // for (int center = 0; center < n; center++)
    // {
    //     int oddAns = expandIndex(s, center, center);
    //     count += oddAns;

    //     int evenAns = expandIndex(s, center, center + 1);
    //     count += evenAns;
    // }
    // cout << count;

    // -------------------------------------------------------------------------------------------------

    // Removing Duplicates from a Sorted Array Leetcode question 26

    // vector<int> nums{0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
    // vector<int> nums{1, 1, 2};

    // int i = 0, j = 1, n = nums.size();
    // while (j < n)
    // {
    //     if (nums[i] == nums[j])
    //     {
    //         j++;
    //     }
    //     else
    //     {
    //         i++;
    //         nums[i] = nums[j];
    //     }
    // }
    // cout << i + 1;

    // -------------------------------------------------------------------------------------------------

    // GFG Largest Element in Array
    // vector<int> nums{1, 8, 7, 56, 90};
    // vector<int> nums {5, 5, 5, 5, 5};
    // vector<int> nums{10};
    // int max = 0, i = 0, n = nums.size();
    // if (n == 1)
    // {
    //     max = nums[i];
    // }
    // else
    // {
    //     for (; i < n; i++)
    //     {
    //         if (nums[i] > max)
    //         {
    //             max = nums[i];
    //         }
    //     }
    // }

    // cout << max << endl;

    // -------------------------------------------------------------------------------------------------

    // Removing Elements from Array LeetCode Question [27]

    cout << endl
         << "Thank You" << endl;

    return 0;
}