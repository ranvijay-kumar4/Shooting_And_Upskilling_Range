#include <iostream>
#include <stack>

using namespace std;

// class Stack
// {
// private:
//     int *arr;
//     int top;
//     int size;

// public:
//     Stack(int size)
//     {
//         arr = new int[size];
//         this->size = size;
//         top = -1;
//     }

//     void push(int data)
//     {
//         if (size - top > 1)
//         {
//             top++;
//             arr[top] = data;
//         }
//         else
//         {
//             cout << "Overflow" << endl;
//         }
//     }

//     void pop()
//     {
//         if (top == -1)
//             cout << "Underflow" << endl;
//         else
//             top--;
//     }

//     int getTop()
//     {
//         if (top == -1)
//             cout << "No Element";
//         else
//             return arr[top];
//     }

//     int getSize()
//     {
//         return top + 1;
//     }

//     bool isEmpty()
//     {
//         if (top == -1)
//             return true;
//         else
//             return false;
//     }
// };

class Stack
{
public:
    int *arr;
    int size;
    int top1;
    int top2;

    Stack(int size)
    {
        arr = new int[size];
        this->size = size;
        top1 = -1;
        top2 = size;
    }

    void push1(int data)
    {
        if (top2 - top1 == 1)
        {
            cout << "OVERFLOW Stack 1" << endl;
        }
        else
        {
            top1++;
            arr[top1] = data;
        }
    }

    void pop1()
    {
        if (top1 == -1)
        {
            cout << "UNDERFLOW Stack 1" << endl;
        }
        else
        {
            arr[top1] = 0;
            top1--;
        }
    }

    void push2(int data)
    {
        if (top2 - top1 == 1)
        {
            cout << "OVERFLOW Stack 2" << endl;
        }
        else
        {
            top2--;
            arr[top2] = data;
        }
    }

    void pop2()
    {
        if (top2 == size)
        {
            cout << "UNDERFLOW Stack 2" << endl;
        }
        else
        {
            arr[top2] = 0;
            top2++;
        }
    }

    void print()
    {
        cout << endl;
        cout << "top1: " << top1 << endl;
        cout << "top2: " << top2 << endl;
        for (int i = 0; i < size; i++)
        {
            cout << arr[i] << " ";
        }
        cout << endl;
    }
};

void printMiddle(stack<int> &s, int &totalSize)
{
    if (s.size() == 0)
    {
        cout << "There is no element in stack" << endl;
        return;
    }

    if (s.size() == totalSize / 2 + 1)
    {
        cout << "Middle element is: " << s.top() << endl;
        return;
    }

    int temp = s.top();
    s.pop();

    printMiddle(s, totalSize);

    s.push(temp);
}

int main()
{

    // ------------- Stack Implementation using ARRAY --------------------
    // First wala Class Stack
    // Stack s(5);

    // s.push(10);
    // s.push(20);
    // s.push(30);
    // s.push(40);
    // s.push(50);

    // while (!s.isEmpty())
    // {
    //     cout << s.getTop() << " ";
    //     s.pop();
    // }
    // cout << endl;

    // cout << "Size of stack " << s.getSize() << endl;

    // s.pop();

    // ------------------- Reverse the elements
    // string str = "racecar";
    // stack<char> s;
    // for (int i = 0; i < str.length(); i++)
    // {
    //     s.push(str[i]);
    // }

    // while (!s.empty())
    // {
    //     cout << s.top() << " ";
    //     s.pop();
    // }
    // cout << endl;

    // -------------------- 2 Stack in single array Implementation
    // Second wala Class Stack

    // Stack s(10);
    // s.push1(10);
    // s.print();
    // s.push1(20);
    // s.print();
    // s.push1(30);
    // s.print();
    // s.push1(40);
    // s.print();
    // s.push1(50);
    // s.print();

    // s.push2(100);
    // s.print();
    // s.push2(110);
    // s.print();
    // s.push2(120);
    // s.print();
    // s.push2(130);
    // s.print();
    // s.push2(140);
    // s.print();

    // s.pop1();
    // s.print();
    // s.pop1();
    // s.print();

    // s.pop1();
    // s.print();

    // s.pop1();
    // s.print();

    // s.pop1();
    // s.print();

    // s.push2(1000);
    // s.print();

    // s.pop1();
    // s.print();

    // ------------- Stack Implementation using STL --------------------

    // stack<int> s;
    // s.push(10);
    // s.push(20);
    // cout << "Top: " << s.top() << endl;
    // s.pop();
    // cout << "Stack size: " << s.size() << endl;

    // ----------------- Printing Middle element of Stack
    stack<int> s;

    s.push(10);
    s.push(20);
    s.push(30);
    s.push(40);
    s.push(50);
    s.push(60);
    s.push(70);

    int totalSize = s.size();
    printMiddle(s, totalSize);

    return 0;
}