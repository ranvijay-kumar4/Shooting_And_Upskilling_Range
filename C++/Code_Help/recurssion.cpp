#include <iostream>
#include <limits.h>
#include <string>
#include <vector>

using namespace std;

void printArr(int arr[], int n, int i)
{
    if (i >= n)
        return;

    cout << arr[i] << " ";
    printArr(arr, n, i + 1);
};

int max_elem(int arr[], int n, int i, int &max)
{
    if (i >= n)
    {
        return max;
    }

    if (arr[i] > max)
    {
        max = arr[i];
    }

    max_elem(arr, n, i + 1, max);
};

int min_elem(int arr[], int n, int i, int &min)
{
    if (i >= n)
    {
        return min;
    }

    if (arr[i] < min)
    {
        min = arr[i];
    }

    min_elem(arr, n, i + 1, min);
};

bool search_key(string str, int i, int n, char key)
{
    if (i >= n)
    {
        return false;
    }

    if (str[i] == key)
    {
        return true;
    }

    return search_key(str, i + 1, n, key);
};

void print_digit(int num)
{
    if (num == 0)
    {
        return;
    }

    print_digit(num / 10); // Recursive call to print digits of the number. 12345 -> 54321 -> 1234 -> 4321 -> 123 -> 21 -> 1

    int digit = num % 10;
    cout << digit << " ";
};

bool isSorted(vector<int> &arr, int i, int &n)
{
    if (i == n)
        return true;

    if (arr[i] > arr[i + 1])
    {
        return false;
    }

    isSorted(arr, i + 1, n);
};

bool binarySearch(vector<int> &arr, int s, int e, int key)
{
    int mid = s + (e - s) / 2;
    if (s > e)
        return false;
    if (arr[mid] == key)
        return true;

    if (arr[mid] > key)
    {
        binarySearch(arr, s, mid - 1, key);
    }
    else
    {
        binarySearch(arr, mid + 1, e, key);
    }
};

void printSubSequence(string str, string ans, int i)
{
    if (i >= str.length())
    {
        cout << ans << endl;
        return;
    }

    printSubSequence(str, ans, i + 1);

    ans.push_back(str[i]);
    printSubSequence(str, ans, i + 1);
};

int changeCoin(vector<int> arr, int key)
{
    if (key == 0)
        return 0;
    if (key < 0)
        return INT_MAX;

    int mini = INT_MAX;
    for (int i = 0; i < arr.size(); i++)
    {
        int ans = changeCoin(arr, key - arr[i]);
        if (ans != INT_MAX)
            mini = min(mini, ans + 1);
    }
    return mini;
};

int cutIntoSegment(int n, int x, int y, int z)
{
    if (n == 0)
        return 0;
    if (n < 0)
        return INT_MIN;

    int ans1 = cutIntoSegment(n - x, x, y, z) + 1;
    int ans2 = cutIntoSegment(n - y, x, y, z) + 1;
    int ans3 = cutIntoSegment(n - z, x, y, z) + 1;

    int ans = max(ans1, max(ans2, ans3));

    return ans;
};

void maxSum(vector<int> arr, int i, int sum, int &maxi){
if (i >= arr.size())
{
    maxi = max(sum, maxi);
    return;
}

maxSum(arr, i + 2, sum + arr[i], maxi);
maxSum(arr, i + 1, sum, maxi);

};

int main()
{

    //  Printing all elements of Array
    // int arr[] = {10, 20, 30, 40, 50};
    // int n = 5, i = 0;
    // printArr(arr, n, i);

    // Finding Maximum element from array
    // int arr[] = {10, 20, 30, 84, 50, 60, 76};
    // int n = 7, i = 0, max = INT_MIN;
    // max_elem(arr, n, i, max);
    // cout << max << endl;

    // Finding Minimum element from array
    // int arr[] = {50, 40, 5, 84, 10, 60, 76};
    // int n = 7, i = 0, min = INT_MAX;
    // min_elem(arr, n, i, min);
    // cout << min << endl;

    // Search for a Key in String
    // string str = "ranvijay";
    // int i = 0, n = str.length();
    // char key = 'a';
    // cout << search_key(str, i, n, key) << endl;

    // Printing Digits of a Number - Once, Tens
    // int num = 12345;
    // print_digit(num);

    // Checking Sorted or Not Sorted
    // vector<int> arr{1, 2, 3, 4, 5, 6};
    // int i = 0, n = arr.size();
    // cout << isSorted(arr, i, n) << endl;

    // Binary Search
    // vector<int> arr{1, 2, 3, 4, 5, 6};
    // int s = 0, e = arr.size() - 1, key = 4;
    // cout << binarySearch(arr, s, e, key) << endl;

    // Print Subsequence
    // Input : "ABC"
    // Output : "_, C, B, BC, A, AC, AB, ABC"
    // int i = 0;
    // string str = "ABC", ans = "";
    // printSubSequence(str, ans, i);

    // Coin Change Problem
    // input : [1, 2] Key : 5
    // Output : 3 - {1, 2, 2} represents no of elements needed to reach key
    // vector<int> arr{1, 2};
    // int key = 5;
    // cout << changeCoin(arr, key) << endl;

    // Cut into Segments
    // int n = 7, x = 5, y = 2, z = 2;
    // int ans = cutIntoSegment(n, x, y, z);
    // if (ans < 0)
    //     ans = 0;
    // cout << ans << endl;

    // Max Sum of Non-Adjacent Element
    // vector<int> arr{2, 1, 4, 9};
    // int sum = 0, maxi = INT_MIN, i = 0;
    // maxSum(arr, i, sum, maxi);
    // cout << maxi << endl;

    return 0;
}