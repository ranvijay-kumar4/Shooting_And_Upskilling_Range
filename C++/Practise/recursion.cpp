// #include <iostream>
// #include <vector>
// #include <limits.h>
#include <bits/stdc++.h>

using namespace std;

void printName(string name, int count)
{
    if (count == 0)
        return;

    cout << count << " " << name << endl;
    // count--;

    printName(name, count - 1);
};

void printNum(int count, int n)
{
    if (count > n)
        return;

    cout << count << " ";
    printNum(count + 1, n);
};

void printNum(int N)
{
    if (N > 0)
    {
        printNum(N - 1);

        cout << N << " ";
    }
    return;
};

void printNumber(int n)
{
    if (n <= 0)
        return;

    cout << n << " ";

    printNumber(n - 1);
};

int sumOfN(int n, int sum)
{
    // This is a Parameterised way of recursion.
    if (n <= 0)
        return sum;

    sumOfN(n - 1, sum + n);
};

int sumOfNumber(int n)
{
    // This is a Functional way of recursion.
    if (n == 0)
        return 0;

    return n + sumOfNumber(n - 1);
};

void reverseArray(int arr[], int i, int j)
{
    if (i >= j)
        return;

    swap(arr[i], arr[j]);

    reverseArray(arr, i + 1, j - 1);
};

int factorial(int n)
{
    // This is a Functional way of recursion.

    if (n <= 1)
        return 1;

    return n * factorial(n - 1);
};

int factorial(int n, int fact)
{
    // This is a Parameterised way of recursion.
    if (n < 1)
        return fact;

    factorial(n - 1, fact * n);
};

int binarySearch(int arr[], int key, int s, int e)
{
    if (s >= e)
        return -1;

    int mid = s + (e - s) / 2;

    if (arr[mid] == key)
        return mid;
    else if (arr[mid] > key)
        binarySearch(arr, key, s, mid - 1);
    else
        binarySearch(arr, key, mid + 1, e);
};

bool checkPalindrome(string &str, int i)
{
    if (i < str.size() / 2)
        return true;

    if (str[i] != str[str.size() - i - 1])
        return false;

    checkPalindrome(str, i + 1);
};

int fibonacci(int n)
{
    if (n <= 1)
        return n;

    return fibonacci(n - 1) + fibonacci(n - 2);
};

void printSubsequence(int i, vector<int> &result, int array[], int n)
{
    if (i == n)
    {
        for (auto it : result)
        {
            cout << it << " ";
        }
        if (result.size() == 0)
        {
            cout << "__";
        }
        cout << endl;
        return;
    }

    result.push_back(array[i]);
    printSubsequence(i + 1, result, array, n);
    result.pop_back();

    printSubsequence(i + 1, result, array, n);
};

void sumSubsequence(int brr[], int s, int sum, int n, vector<int> ans, int i)
{
    if (i == n)
    {
        if (s == sum)
        {
            for (auto it : ans)
            {
                cout << it << " ";
            }
            cout << endl;
        }
        return;
    }

    // Pick
    ans.push_back(brr[i]);
    s += brr[i];
    sumSubsequence(brr, s, sum, n, ans, i + 1);
    s -= brr[i];
    ans.pop_back();

    // Not Pick
    sumSubsequence(brr, s, sum, n, ans, i + 1);
};

int noOfElem(vector<int> &arr, int target)
{
    if (target == 0)
        return 0;
    if (target < 0)
        return INT_MAX;

    int mini = INT_MAX;
    for (int i = 0; i < arr.size(); i++)
    {
        int ans = noOfElem(arr, target - arr[i]);

        if (ans != INT_MAX)
            mini = min(mini, ans + 1);
    }
    return mini;
};

int segmentsOfRod(int n, int x, int y, int z)
{
    if (n == 0)
        return 0;

    if (n < 0)
        return INT_MIN;

    int res1 = segmentsOfRod(n - x, x, y, z) + 1;
    int res2 = segmentsOfRod(n - y, x, y, z) + 1;
    int res3 = segmentsOfRod(n - z, x, y, z) + 1;

    int res = max(res1, max(res2, res3));

    return res;
};

void nonAdjacentSum(vector<int> &arr, int i, int sum, int &maxi)
{
    if (i >= arr.size())
    {
        maxi = max(sum, maxi);
        return;
    }

    nonAdjacentSum(arr, i + 2, sum + arr[i], maxi);
    nonAdjacentSum(arr, i + 1, sum, maxi);
};

void merge(vector<int> &arr, int low, int mid, int high)
{
    vector<int> temp;
    int left = low, right = mid + 1;
    while (left <= mid && right <= high)
    {
        if (arr[left] <= arr[right])
        {
            temp.push_back(arr[left]);
            left++;
        }
        else
        {
            temp.push_back(arr[right]);
            right++;
        }
    }
    while (left <= mid)
    {
        temp.push_back(arr[left]);
        left++;
    }

    while (right <= high)
    {
        temp.push_back(arr[right]);
        right++;
    }

    for (int i = low; i <= high; i++)
    {
        arr[i] = temp[i - low];
    }
};

void mergeSort(vector<int> &arr, int low, int high)
{
    if (low == high)
        return;
    int mid = (low + high) / 2;
    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);

    merge(arr, low, mid, high);
};

int partition(vector<int> &arr, int low, int high)
{
    int pivot = arr[low];
    int i = low, j = high;

    while (i < j)
    {
        while (arr[i] <= pivot && i <= high - 1)
        {
            i++;
        }
        while (arr[j] > pivot && j > low + 1)
        {
            j--;
        }
        if (i < j)
            swap(arr[i], arr[j]);
    }
    swap(arr[low], arr[j]);

    return j;
};

void quickSort(vector<int> &arr, int low, int high)
{
    if (low < high)
    {
        int pIndex = partition(arr, low, high);
        quickSort(arr, low, pIndex - 1);
        quickSort(arr, pIndex + 1, high);
    }
};

int main()
{

    //  Print name 5 times using recursion.
    printName("Ranvijay", 5);

    // Print numbers from 1 to n using recursion.
    int count = 1;
    printNum(count, 10);
    cout << endl;
    printNum(10);
    cout << endl;

    // Print numbers from n to 1 using recursion.
    printNumber(10);
    cout << endl;

    // Print sum of N numbers using recursion.
    cout << sumOfN(3, 0);
    cout << endl;
    cout << sumOfNumber(4);
    cout << endl;

    // Reverse an Array using Recursion.
    int arr[] = {1, 2, 4, 5, 6};
    reverseArray(arr, 0, 4);
    for (int i = 0; i < 5; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;

    // Print the factorial of N numbers.
    cout << factorial(4) << endl;
    cout << factorial(5, 1) << endl;

    // Performing Binary Search using recursion.
    int a[] = {1, 2, 3, 4, 5, 6};
    cout << binarySearch(a, 3, 0, 5) << endl;

    // Check Palindrome using recursion.
    string str = "racecar";
    cout << checkPalindrome(str, 0) << endl;

    // Print fibonacci number at N position using Recursion.
    cout << fibonacci(6) << endl;

    // Print N fibonacci numbers using Recursion.
    cout << fibonacci(6) << endl;
    int i = 0, sum = 0;
    while (i < 6)
    {
        cout << fibonacci(i) << " ";
        sum += fibonacci(i);
        i++;
    }
    cout << " -- " << sum;

    cout << endl;
    cout << endl;

    // DP is Optimization of recursion call
    // Printing all the subsequence using recursion.

    int array[] = {3, 1, 2}, n = 3;
    vector<int> result;
    cout << "Subsequences : " << endl;
    printSubsequence(0, result, array, n);

    cout << endl;

    // Printing Subsequence that are equal to Sum using recursion.
    int brr[] = {1, 2, 1}, sumS = 2, m = 3;
    vector<int> ans;

    cout << "Subsequences that are equal to Sum : " << endl;
    sumSubsequence(brr, 0, sumS, m, ans, 0);
    cout << endl;

    // Finding Maximum numbers of elements required to reach sum.
    vector<int> Mrr{1, 2, 3};
    int target = 5;
    cout << "Maximum numbers of elements required : " << noOfElem(Mrr, target) << endl;

    // Finding the maximum number of segments that can be obtained.
    int len = 7, x = 5, y = 2, z = 2;
    int segment = segmentsOfRod(len, x, y, z);
    if (segment < 0)
        segment = 0;

    cout << endl
         << "Maximum number of segments : "
         << segment << endl;

    // Finding Maximum sum of Non Adjacent elements
    vector<int> srr{1, 2, 3, 1, 3, 5, 8, 1, 9};
    int sums = 0, maxi = INT_MIN, ind = 0;

    nonAdjacentSum(srr, ind, sums, maxi);

    cout << endl
         << "Maximum sum of Non Adjacent elements : "
         << maxi << endl;
    cout << endl;

    // Merge Sort -> Divide and conquer
    vector<int> merge{3, 1, 2, 4, 1, 5, 6, 2, 4};
    mergeSort(merge, 0, merge.size() - 1);
    cout << "Merge Sort : ";
    for (int i = 0; i < merge.size(); i++)
    {
        cout << merge[i] << " ";
    }
    cout << endl;

    // Quick Sort -> Divide and conquer
    vector<int> quick{3, 1, 2, 4, 1, 5, 6, 2, 4};
    quickSort(quick, 0, quick.size() - 1);
    cout << "Quick Sort : ";
    for (int i = 0; i < quick.size(); i++)
    {
        cout << quick[i] << " ";
    }
    cout << endl;

    return 0;
}
