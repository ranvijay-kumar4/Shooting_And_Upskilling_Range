/*
Factorial without Multiplication & Division
    You are given a positive integer N. Your task is to compute the factorial of N without using any multiplication (∗) or division (/) operators.

    Factorial of a number N is defined as: N! = N × (N−1) × (N − 2) × ... × 1.

Input Format
    The first line of input will contain a single integer T, denoting the number of test cases.
    Each of the next T lines will contain a single integer N, where N is the number for which you need to calculate the factorial.

Output Format
    For each test case, output the factorial of the given number N.

Constraints
    1 ≤ T ≤ 10
    0 ≤ N ≤ 12

Input 
    2
    5
    9

Output
    120
    362880
*/

#include<bits/stdc++.h>

using namespace std;

int main(){
    int T;
    cin >> T;
    while(T--){
        int n, ans = 1;
        cin >> n;
        for(int i = n; i > 0; i--){
            ans = ans * i; 
        }
        cout << "Answer : " << ans << endl;
    }

    return 0;
}