#include <iostream>

using namespace std;

class Node
{
public:
    int data;
    Node *next;

    // Default Constructor
    Node()
    {
        this->data = 0;
        this->next = NULL;
    }

    // Constructor that holds data or value only
    Node(int data)
    {
        this->data = data;
        this->next = NULL;
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

int findLength(Node *&head)
{
    int i = 0;
    Node *temp = head;

    while (temp != NULL)
    {
        temp = temp->next;
        i++;
    }
    return i;
};

void insertAtHead(Node *&head, int data)
{
    // Step 1 : Create Node
    Node *b = new Node(data);

    // Step 2 : pointing the new Node's next to previous head node
    b->next = head;

    // Step 3 : Transferring old head position to the new node'
    head = b;
};

void insertAtHead(Node *&head, Node *&tail, int data)
{
    if (head == NULL)
    {
        Node *b = new Node(data);
        head = b;
        tail = b;
        return;
    }
    else
    {
        // Step 1 : Create Node
        Node *b = new Node(data);

        // Step 2 : pointing the new Node's next to previous head node
        b->next = head;

        // Step 3 : Transferring old head position to the new node'
        head = b;
    }
};

void insertAtTail(Node *&tail, int data)
{
    // Step 1 : Create a Node
    Node *a = new Node(data);

    // Step 2 : Moving previous tail's next to the new Node
    tail->next = a;

    // Step 3 : Transferring the tail position to new Node
    tail = a;
};

void insertAtTail(Node *&head, Node *&tail, int data)
{
    if (head == NULL)
    {
        Node *b = new Node(data);
        head = b;
        tail = b;
        return;
    }
    else
    {
        // Step 1 : Create a Node
        Node *a = new Node(data);

        // Step 2 : Moving previous tail's next to the new Node
        tail->next = a;

        // Step 3 : Transferring the tail position to new Node
        tail = a;
    }
};

void insertAtAnyPosition(Node *&head, Node *&tail, int position, int data)
{
    int i = 1, length = findLength(head);

    if (head == NULL)
    {
        Node *c = new Node(data);
        head = c;
        tail = c;
        return;
    }

    // At Start Position
    if (position == 0)
    {
        insertAtHead(head, tail, data);
        return;
    }

    // At Last position
    if (position >= length)
    {
        insertAtTail(head, tail, data);
        return;
    }

    // At Given Position which is neither first nor last

    // Step1 : find Curr and Prev
    Node *prev = head;
    while (i < position)
    {
        prev = prev->next;
        i++;
    }
    Node *curr = prev->next;

    // Step2 : Create node
    Node *c = new Node(data);

    // Step3 : Give new node's next to curr
    c->next = curr;

    // Step4 : Give prev's next to new node
    prev->next = c;
};

int main()
{
    // First Node - Dynamically

    // Node *head = new Node(10);
    // Node *first = new Node(20);
    // Node *second = new Node(30);
    // Node *third = new Node(40);
    // Node *fourth = new Node(50);
    // Node *fifth = new Node(60);
    // Node *tail = new Node(70);

    // head->next = first;
    // first->next = second;
    // second->next = third;
    // third->next = fourth;
    // fourth->next = fifth;
    // fifth->next = tail;

    // cout << "Printing Linked List : ";
    // printLinkedList(head);
    // cout << endl;
    // cout << endl;

    // Insert a node at the position of Head

    // Node *a = new Node(20);

    // cout << "Before : ";
    // printLinkedList(a);
    // cout << endl;

    // insertAtHead(a, 30);
    // insertAtHead(a, 40);
    // insertAtHead(a, 50);

    // cout << "After Insertion at Head : ";
    // printLinkedList(a);
    // cout << endl;
    // cout << endl;

    // Insert a Node at the position of Tail

    // Node *b = new Node(30);

    // cout << "Before : ";
    // printLinkedList(b);
    // cout << endl;

    // insertAtTail(b, 40);

    // cout << "After Insertion at Tail : ";
    // printLinkedList(b);
    // cout << endl;
    // cout << endl;

    // Insert a Node at any position

    // Node *c = new Node(10);
    // Node *d = new Node(20);
    // Node *e = new Node(30);
    // Node *f = new Node(40);

    // c->next = d;
    // d->next = e;
    // e->next = f;

    // Default Values of Head and Tail
    Node *head = NULL;
    Node *tail = NULL;

    insertAtHead(head, tail, 10);
    insertAtHead(head, tail, 20);
    insertAtHead(head, tail, 30);
    insertAtHead(head, tail, 40);
    insertAtHead(head, tail, 50);

    insertAtTail(head, tail, 60);
    insertAtTail(head, tail, 70);
    insertAtTail(head, tail, 80);

    cout << endl;
    cout << "Before Insertion at position : ";
    printLinkedList(head);
    cout << endl;

    // insertAtAnyPosition(head, tail, 0, 5);
    // insertAtAnyPosition(head, tail, 9, 5);
    insertAtAnyPosition(head, tail, 5, 5);


    cout << endl;
    cout << "After Insertion at position : ";
    printLinkedList(head);

    return 0;
}