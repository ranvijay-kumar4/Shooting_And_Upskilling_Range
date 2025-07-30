#include <iostream>
// #include<bits/stdc++.h>
#include <queue>

using namespace std;

class Queue
{
public:
    int *arr;
    int size;
    int front;
    int rear;

    Queue(int size)
    {
        this->size = size;
        arr = new int[size];
        front = 0;
        rear = 0;
    }

    void push(int data)
    {
        if (rear == size)
            cout << " -- Queue is full -- ";
        else
        {
            arr[rear] = data;
            rear++;
        }
    }

    void pop()
    {
        if (front == rear)
            cout << "-- Queue is empty --";
        else
        {
            arr[front] = -1;
            front++;

            if (front == rear)
            {
                front = 0;
                rear = 0;
            }
        }
    }

    int getfront()
    {
        if (front == rear)
        {
            cout << "-- Queue is empty --";
            return -1;
        }
        else
        {
            return arr[front];
        }
    }

    bool isempty()
    {
        if (front == rear)
            return true;
        else
            return false;
    }

    int getsize()
    {
        return rear - front;
    }
};

int main()
{

    // ------------------------------------------------------------------------------------------------- Using STL

    // queue<int> q;

    // // Insertion
    // q.push(10);
    // q.push(20);
    // q.push(30);
    // q.push(40);
    // q.push(50);

    // // Deletion
    // q.pop(); //10 deleted;

    // // Top / Front
    // cout << q.front() << endl;

    // // Size
    // cout << q.size() << endl;

    // // Empty
    // cout << q.empty() << endl;


    // ------------------------------------------------------------------------------------------------- Using Array
    Queue qu(10);

    qu.push(20);
    qu.push(30);
    qu.push(40);
    qu.push(50);


    cout << qu.getsize() << endl;
    qu.pop();
    cout << qu.getsize() << endl;
    cout << qu.getfront() << endl;
    cout << qu.isempty() << endl;


    return 0;
}