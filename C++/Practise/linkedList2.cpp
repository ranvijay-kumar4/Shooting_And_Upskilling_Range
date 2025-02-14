// #include <bits/stdc++.h>
#include <iostream>

using namespace std;

// Doubly LinkedList
class Node
{
public:
    Node *prev;
    int data;
    Node *next;

    Node()
    {
        this->prev = NULL;
        this->data = 0;
        this->next = NULL;
    }

    Node(int data)
    {
        this->prev = NULL;
        this->data = data;
        this->next = NULL;
    }

    ~Node(){
        cout << "Destructor : " << this->data;
    }
};

void printLinkedList(Node *&head)
{
    Node *temp = head;
    while (temp != NULL)
    {
        cout << temp->data << " ";
        temp = temp->next;
    }
};

int getLength(Node *&head)
{
    Node *temp = head;
    int i = 0;
    while (temp != NULL)
    {
        temp = temp->next;
        i++;
    }
    return i;
};

void insertAtHead(Node *&head, Node *&tail, int data)
{
    if (head == NULL)
    {
        Node *a = new Node(data);
        head = a;
        tail = a;
        return;
    }

    Node *a = new Node(data);
    a->next = head;
    head->prev = a;
    head = a;
};

void insertAtTail(Node *&head, Node *&tail, int data)
{
    if (head == NULL)
    {
        Node *a = new Node(data);
        a = head;
        a = tail;
        return;
    }

    Node *a = new Node(data);
    tail->next = a;
    a->prev = tail;
    tail = a;
};

void insertAtAnyPosition(Node *&head, Node *&tail, int data, int position)
{
    int i = 0, length = getLength(head);
    if (head == NULL)
    {
        Node *a = new Node(data);
        head = a;
        tail = a;
        return;
    }

    if (position == 0)
    {
        insertAtHead(head, tail, data);
        return;
    }

    if (position >= length)
    {
        insertAtTail(head, tail, data);
        return;
    }

    Node *prev = head;
    while (i < position)
    {
        prev = prev->next;
        i++;
    }
    Node *curr = prev->next;
    Node *a = new Node(data);
    prev->next = a;
    a->prev = prev;
    curr->prev = a;
    a->next = curr;
};

void deleteNode(Node *&head, Node *&tail, int position)
{
    int i = 1, length = getLength(head);

    if (head == NULL)
    {
        cout << "Empty" << endl;
        return;
    }

    if (head->next == NULL)
    {
        Node *temp = head;
        head = NULL;
        tail = NULL;
        delete temp;
        return;
    }

    if (position == 1)
    {
        Node *temp = head;
        head = head->next;
        head->prev = NULL;
        temp->next = NULL;
        delete temp;
        return;
    }

    if (position == length)
    {
        Node *temp = tail;
        tail = tail->prev;
        temp->prev = NULL;
        tail->next = NULL;
        delete temp;
        return;
    }

    if (position > length)
    {
        cout << "Not Valid Position" << endl;
    }

    Node *left = head;
    while (i < position)
    {
        left = left->next;
        i++;
    }
    Node *curr = left->next;
    Node *right = curr->next;

    left->next = right;
    right->prev = left;

    curr->next = NULL;
    curr->prev = NULL;
    delete curr;
};

int main()
{
    Node *first = new Node(10);
    Node *second = new Node(20);
    Node *third = new Node(30);
    Node *fourth = new Node(40);
    Node *fifth = new Node(50);

    first->next = second;
    second->prev = first;

    second->next = third;
    third->prev = second;

    third->next = fourth;
    fourth->prev = third;

    fourth->next = fifth;
    fifth->prev = fourth;

    Node *head = first;
    Node *tail = fifth;
    cout << endl;
    cout << "Doubly Linked List : ";
    printLinkedList(head);
    cout << endl;
    cout << endl;
    cout << "Length of Linked List : " << getLength(head) << endl;
    cout << endl;
    cout << endl;

    // Insertion at Head/First node
    cout << "Before Insertion at Head : ";
    printLinkedList(head);
    cout << endl;
    insertAtHead(head, tail, 101);
    cout << endl;
    cout << "After Insertion at Head :";
    printLinkedList(head);
    cout << endl;
    cout << endl;

    // Insertion at Tail/Last Node
    cout << "Before Insertion at Tail : ";
    printLinkedList(head);
    cout << endl;
    insertAtTail(head, tail, 105);
    cout << endl;
    cout << "After Insertion at Tail :";
    printLinkedList(head);
    cout << endl;
    cout << endl;

    // Insertion at any Position
    cout << "Before Insertion at any Position : ";
    printLinkedList(head);
    cout << endl;
    insertAtAnyPosition(head, tail, 205, 4);
    cout << endl;
    cout << "After Insertion at any Position : ";
    printLinkedList(head);
    cout << endl;
    cout << endl;

    // Deletion of Node
    cout << "Before Deletion of Node : ";
    printLinkedList(head);
    cout << endl;
    deleteNode(head, tail, 0);
    cout << endl;
    cout << "After Deletion of Node : ";
    printLinkedList(head);
    cout << endl;
    cout << endl;

    // Reversing a Linked List
    

    return 0;
}