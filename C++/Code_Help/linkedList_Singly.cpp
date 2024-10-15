#include <iostream>

using namespace std;

class node
{
public:
    int data;
    node *next;

    node()
    {
        this->data = 0;
        this->next = NULL;
    }
    node(int data)
    {
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
        // temp++ can't be done as Linked List stores data in a Non-Continuous Memory blocks
        // temp ->next->next; moves 2 steps
        // temp ->next->next->next; moves 3 steps
        // temp ->next->data; moves 1 step and prints present data i.e. 10
    }
    cout << endl;
};

void insertAtBeginning(node *&head, node *&tail, int data)
{
    // Create a new node with given data
    node *newNode = new node(data);
    // Make the new node's next pointer point to the current head
    newNode->next = head;
    if (head == NULL)
    {
        tail = newNode;
    }
    // Update the head pointer to point to the new node
    head = newNode;
};

int findLength(node *&head)
{
    int len = 0;
    node *temp = head;
    while (temp != NULL)
    {
        temp = temp->next;
        len++;
    }
    return len;
};

void insertAtEnd(node *&head, node *&tail, int data)
{
    // Creating Node
    node *newNode = new node(data);
    // Connect with Tail Node
    if (tail == NULL)
    {
        // means there is not any node present
        tail = newNode;
        head = newNode;
    }
    else
    {
        tail->next = newNode;
    }
    // Update the tail pointer to point to the new node
    tail = newNode;
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

    int len = findLength(head);

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
    int len = findLength(head);

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

int main()
{
    // Singly Linked List
    // --------------------------------------------------------------------------------------

    // Create a linked list manually and print it
    // node *first = new node(10);
    // node *second = new node(20);
    // node *third = new node(30);
    // node *fourth = new node(40);
    // node *fifth = new node(50);

    // first->next = second;
    // second->next = third;
    // third->next = fourth;
    // fourth->next = fifth;

    // print(first); // Output: 10 20 30 40 50

    // --------------------------------------------------------------------------------------

    // Insertion at beginning
    node *head = NULL;
    node *tail = NULL;
    insertAtBeginning(head, tail, 10);
    insertAtBeginning(head, tail, 20);
    insertAtBeginning(head, tail, 30);
    insertAtBeginning(head, tail, 40);
    insertAtBeginning(head, tail, 50);
    insertAtBeginning(head, tail, 99);
    print(head); // Output: 99 50 40 30 20 10
    cout << endl;

    // Insertion at end
    insertAtEnd(head, tail, 77);
    insertAtEnd(head, tail, 88);
    print(head); // Output: 99 50 40 30 20 10 77 88
    cout << endl;

    // Insertion at a Position
    insertAtPosition(66, 5, head, tail);
    print(head); // Output: 99 50 40 30 20 66 10 77 88
    cout << endl;

    // Deletion
    deleteNode(2, head, tail);
    cout << endl;
    print(head);
    cout << endl;


    return 0;
}