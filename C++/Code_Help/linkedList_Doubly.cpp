#include <iostream>

using namespace std;

class node
{
public:
    int data;
    node *prev;
    node *next;

    node()
    {
        this->prev = NULL;
        this->data = 0;
        this->next = NULL;
    }
    node(int data)
    {
        this->prev = NULL;
        this->data = data;
        this->next = NULL;
    }
};

void print(node *&head)
{
    node *temp = head;
    while (temp != NULL)
    {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
};

int getLength(node *&head)
{
    node *temp = head;
    int length = 0;
    while (temp != NULL)
    {
        length++;
        temp = temp->next;
    }
    cout << "Length of the list: " << length << endl;
    return length;
};

void insertAtBeginning(node *&head, node *&tail, int data)
{

    // step1:
    node *newNode = new node(data);
    if (head == NULL)
    {
        head = newNode;
        tail = newNode;
    }
    else
    {
        newNode->next = head;
        head->prev = newNode;
        head = newNode;

        // step2:
        // newNode->next = head;
        // step3:
        // head = newNode;
    }
};

void insertAtEnd(node *&head, node *&tail, int data)
{
    // step1:
    node *newNode = new node(data);

    if (head == NULL)
    {
        head = newNode;
        tail = newNode;
    }
    else
    {
        // Step 2
        tail->next = newNode;
        // Step 3
        newNode->prev = tail;
        // Step 4
        tail = newNode;
    }
};

void insertAtPosition(int data, int position, node *&head, node *&tail)
{
    if (head == NULL)
    {
        node *newNode = new node(data);
        head = newNode;
        tail = newNode;
        return;
    }
    // step1: find the position: prev & curr;

    if (position == 0)
    {
        insertAtBeginning(head, tail, data);
        return;
    }

    int len = getLength(head);

    if (position >= len)
    {
        insertAtEnd(head, tail, data);
        return;
    }
    // ste1:find prev and curr
    int i = 1;
    node *prev = head;
    while (i < position)
    {
        prev = prev->next;
        i++;
    }
    node *curr = prev->next;

    // step2;
    node *newNode = new node(data);

    // step3:
    newNode->next = curr;

    // step4:
    prev->next = newNode;
};

void deleteNode(int position, node *&head, node *&tail)
{
    if (head == NULL)
    {
        cout << "Cannot delete, LL is empty";
        return;
    }

    // deleting first node
    if (position == 1)
    {
        node *temp = head;
        head = head->next;
        temp->next = NULL;
        delete temp;
        return;
    }
    int len = getLength(head);

    // deleting last node
    if (position == len)
    {
        // find prev
        int i = 1;
        node *prev = head;
        while (i < position - 1)
        {
            prev = prev->next;
            i++;
        }
        // step2:
        prev->next = NULL;
        // step3:
        node *temp = tail;
        // step4:
        tail = prev;
        // step5:
        delete temp;
        return;
    }

    // deleting middle node

    // step  : find prev and curr
    int i = 1;
    node *prev = head;
    while (i < position - 1)
    {
        prev = prev->next;
        i++;
    }
    node *curr = prev->next;

    // step2:
    prev->next = curr->next;
    // step3:
    curr->next = NULL;
    // step4:
    delete curr;
};

node *reverse(node *&prev, node *&curr)
{
    // base case
    if (curr == NULL)
    {
        // LL reverse ho chuki
        return prev;
    }

    // 1 case solve then recursion will take care
    node *forward = curr->next;
    curr->next = prev;

    reverse(curr, forward);
};

node *reverseusingLoop(node *head)
{
    node *prev = NULL;
    node *curr = head;

    while (curr != NULL)
    {
        node *temp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = temp;
    }
    return prev;
};

node *reverseusingRecursion(node *prev, node *curr)
{
    // base case
    if (curr == NULL)
        return prev;

    node *temp = curr->next;
    curr->next = prev;
    prev = curr;
    curr = temp;

    // recursion sambhal lega
    return reverseusingRecursion(prev, curr);
};

int main()
{

    // Doubly Linked List
    // --------------------------------------------------------------------------------------

    // Creating nodes

    // node *first = new node(10);
    // node *second = new node(20);
    // node *third = new node(30);
    // node *fourth = new node(40);
    // node *fifth = new node(50);

    // first->prev = NULL;
    // first->next = second;

    // second->prev = first;
    // second->next = third;

    // third->prev = second;
    // third->next = fourth;

    // fourth->prev = third;
    // fourth->next = fifth;

    // fifth->prev = fourth;

    // Printing Linked List
    // cout << endl;
    // print(first); // Output: 10 20 30
    // cout << endl;

    // Getting Length of Linked List
    // cout << endl;
    // getLength(first); // Output: Length of the list: 5
    // cout << endl;

    // --------------------------------------------------------------------------------------
    // Insertion at beginning

    node *head = NULL;
    node *tail = NULL;

    insertAtBeginning(head, tail, 1);
    insertAtBeginning(head, tail, 2);
    insertAtBeginning(head, tail, 3);
    insertAtBeginning(head, tail, 4);
    insertAtBeginning(head, tail, 5);

    cout << endl;
    print(head);
    cout << endl;

    // --------------------------------------------------------------------------------------
    // Insertion at end

    // insertAtEnd(head, tail, 99);
    // insertAtEnd(head, tail, 100);

    // cout << endl;
    // print(head);
    // cout << endl;

    // --------------------------------------------------------------------------------------
    // Insertion at any position

    // insertAtPosition(101, 1, head, tail);
    // cout << endl;
    // print(head);
    // cout << endl;

    // --------------------------------------------------------------------------------------
    // Deletion at any position

    // deleteNode(9, head, tail);
    // cout << endl;
    // print(head);
    // cout << endl;

    // --------------------------------------------------------------------------------------
    // Reverse Linked List

    node *prev = NULL;
    node *curr = head;
    cout << "Printing Reverse Linked List" << endl;
    head = reverse(prev, curr);
    cout << endl;
    print(head);
    cout << endl;
    // --------------------------------------------------------------------------------------
    // Reverse Linked List using loop

    cout << "Printing Reverse Linked List using loop" << endl;
    head = reverseusingLoop(head);
    cout << endl;
    print(head);
    cout << endl;

    // --------------------------------------------------------------------------------------
    // Reverse Linked List using Recurssion

    cout << "Printing Reverse Linked List using Recursion" << endl;
    head = reverseusingRecursion(prev, curr);
    cout << endl;
    print(head);
    cout << endl;

    return 0;
}