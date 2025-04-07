#include <iostream>
// #include<bits/stdc++.h>
#include <vector>
#include <stack>

using namespace std;

void insertBottom(stack<int> &s, int target)
{
    if (s.empty())
    {
        s.push(target);
        return;
    }

    int topElem = s.top();
    s.pop();
    insertBottom(s, target);
    s.push(topElem);
};

void insertAtBottom(stack<int> &s)
{
    if (s.empty())
    {
        cout << "---- Empty ----" << endl;
        return;
    }

    int target = s.top();
    s.pop();
    insertBottom(s, target);
};

void reverseStack(stack<int> &s)
{
    if (s.empty())
        return;

    int element = s.top();
    s.pop();

    reverseStack(s);

    insertBottom(s, element);
};

void insertSort(stack<int> &s, int elem)
{
    if (s.empty() || elem <= s.top())
    {
        s.push(elem);
        return;
    }

    int topelem = s.top();
    s.pop();
    insertSort(s, elem);

    s.push(topelem);
};

void sortStack(stack<int> &s)
{
    if (s.empty())
        return;

    int top = s.top();
    s.pop();

    sortStack(s);

    insertSort(s, top);
};

int main()
{
    // stack<int> s;
    // s.push(10);
    // s.push(20);
    // s.push(30);
    // s.push(40);
    // s.push(50);

    // insertAtBottom(s);

    // reverseStack(s);
    // Printing Stack
    // while (!s.empty())
    // {
    //     cout << s.top() << " ";
    //     s.pop();
    // }

    // stack<int> st;
    // st.push(7);
    // st.push(11);
    // st.push(3);
    // st.push(5);
    // st.push(9);

    // sortStack(st);

    // // Printing Stack
    // while (!st.empty())
    // {
    //     cout << st.top() << " ";
    //     st.pop();
    // }

    // Next Smaller Element
    // Inp : 2 1 4 3
    // Otp : 1 -1 3 -1

    vector<int> v;
    v.push_back(2);
    v.push_back(1);
    v.push_back(4);
    v.push_back(3);

    stack<int> st;
    st.push(-1);
    vector<int> ans(v.size());
    // for(int i = v.size() - 1; i >= 0; i--){
    //     int curr = v[i];
    //     while(st.top() >= curr){
    //         st.pop();
    //     }
    //     ans[i] = st.top();
    //     st.push(curr);
    // }

    // Previous Smaller Element
    // Inp : 2 1 4 3
    // Otp : -1 -1 1 1
    for (int i = 0; i < v.size(); i++)
    {
        int curr = v[i];
        while (st.top() >= curr)
        {
            st.pop();
        }
        ans[i] = st.top();
        st.push(curr);
    }

    for (int i = 0; i < ans.size(); i++)
    {
        cout << ans[i] << " ";
    }

    return 0;
}