/*
Count Pairs divisible by 2
    You're given a list of numbers. Your task is to find how many pairs of numbers in that list add up to an even number. A pair consists of two different numbers from the list. For example, in the list [1, 2, 3, 4], the pairs that sum to an even number are (1, 3) and (2, 4).

Input Format
    The first line of input will contain a single integer T, denoting the number of test cases.
    Each test case consists of two lines of input.
        The first line of each test case contain N, length of array arr.
        The second line consist of the array arr.

Output Format
    For each test case, output on a new line the number of divisible pairs.

Constraints
    1≤T≤100
    2≤N≤10^5
    0≤arr[i]≤10^5

Input
    3
    4
    6 1 2 3
    6
    2 2 1 7 5 3
    2
    4 8

Output
    2
    7
    1
*/

#include <bits/stdc++.h>

using namespace std;

int main()
{
    int T;
    cin >> T;
    while (T--)
    {

        int N, count = 0;
        cin >> N;
        int arr[N];
        for (int i = 0; i < N; i++)
        {
            cin >> arr[i];
        }

        for (int i = 0; i < N - 1; i++)
        {
            for (int j = i + 1; j < N; j++)
            {
                if((arr[i] + arr[j]) % 2 == 0)
                    count++;
            }
        }

        cout << "Answer : " << count << endl;
    }

    return 0;
}