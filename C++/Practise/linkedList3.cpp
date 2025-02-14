#include <iostream>

using namespace std;

class Node
{
public:
    int data;
    Node *next;

    Node()
    {
        this->data = 0;
        this->next = NULL;
    }

    Node(int data)
    {
        this->data = data;
        this->next = NULL;
    }
};

void printList(Node *&head)
{
    Node *temp = head;

    while (temp != NULL)
    {
        cout << temp->data << " ";
        temp = temp->next;
    }
    return;
};

int getLength(Node *&head)
{
    int i = 0;
    Node *temp = head;
    while (temp != NULL)
    {
        i++;
        temp = temp->next;
    }
    return i;
};

Node *reverse(Node *&prev, Node *curr)
{
    if (curr == NULL)
        return prev;

    Node *forward = curr->next;
    curr->next = prev;

    reverse(curr, forward);
};

Node *getMiddleByLoop(Node *&head)
{
    int length = getLength(head);

    Node *temp = head;
    int i = 1;

    while (i <= length / 2)
    {
        temp = temp->next;
        i++;
    }
    return temp;
};

Node *getMiddleByTortoise(Node *&head)
{
    Node *slow = head;
    Node *fast = head;

    if (head == NULL || head->next == NULL)
        return head;

    while (fast != NULL && fast->next != NULL)
    {
        slow = slow->next;
        fast = fast->next->next;
    }

    return slow;
};

Node *reverseKNode(Node *&head, int k)
{
    if (head == NULL || head->next == NULL)
        return head;

    Node *prev = NULL;
    Node *curr = head;
    Node *nxt;
    int count = 0;
    while (count < k)
    {
        nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
        count++;
    }

    if (nxt != NULL)
        head->next = reverseKNode(nxt, k);

    return prev;
};

bool checkForLoop(Node *&head)
{
    if (head == NULL)
        return false;

    Node *slow = head;
    Node *fast = head;

    while (fast != NULL)
    {
        fast = fast->next;
        if (fast != NULL)
        {
            fast = fast->next;
            slow = slow->next;
        }

        if (fast == slow)
            return true;
    }
    return false;
};

Node *startingPoint(Node *&head)
{
    if (head == NULL)
        return NULL;

    Node *slow = head;
    Node *fast = head;

    while (fast != NULL)
    {
        fast = fast->next;
        if (fast != NULL)
        {
            slow = slow->next;
            fast = fast->next;
        }

        if (fast == slow)
        {
            slow = head;
            break;
        }
    }

    while (slow != fast)
    {
        slow = slow->next;
        fast = fast->next;
    }

    return fast;
};
void removeLoop(Node *&head){
    if(head == NULL)
        return;

    Node *slow = head;
    Node *fast = head;

    while(fast != NULL){
        fast = fast->next;
        if(fast != NULL){
            fast = fast->next;
            slow = slow->next;
        }

        if(fast == slow){
            slow = head;
            break;
        }
    }

    Node *prev;
    while(fast != slow){
        prev = fast;
        fast = fast->next;
        slow = slow->next;
    }

    prev->next = NULL;
};

int main()
{
    // Node *head = NULL;
    // Node *tail = NULL;

    // head = new Node(10);
    // Node *first = new Node(20);
    // Node *second = new Node(30);
    // Node *third = new Node(40);
    // Node *fourth = new Node(50);
    // Node *fifth = new Node(60);
    // tail = new Node(70);

    // head->next = first;
    // first->next = second;
    // second->next = third;
    // third->next = fourth;
    // fourth->next = fifth;
    // fifth->next = tail;

    // head = new Node(10);
    // Node *first = new Node(20);
    // Node *second = new Node(30);
    // Node *third = new Node(40);
    // Node *fourth = new Node(50);
    // tail = new Node(60);

    // head->next = first;
    // first->next = second;
    // second->next = third;
    // third->next = fourth;
    // fourth->next = tail;

    // printList(head);
    // cout << endl;

    // Reverse a Linked List
    // cout << endl;
    // cout << "List Before reverse : ";
    // printList(head);
    // cout << endl;
    // Node *prev = NULL;
    // Node *curr = head;
    // // head = reverse(prev, curr);
    // cout << "List After reverse : ";
    // printList(head);

    // Find the Middle Node Of Linked List using LOOP
    // cout << endl;
    // cout << endl;
    // cout << "Linked List : ";
    // printList(head);
    // Node *middleNode = getMiddleByLoop(head);
    // cout << endl;
    // cout << "Middle Node : " << middleNode->data;

    // Find the Middle Node of Linked List using TWO POINTER / TORTOISE ALGO / SLOW - FAST App
    // cout << endl;
    // cout << endl;
    // cout << "Linked List : ";
    // printList(head);
    // Node *midNode = getMiddleByTortoise(head);
    // cout << endl;
    // cout << "Middle Node : " << midNode->data;

    // Reverse K nodes of Linked List
    // cout << endl;
    // cout << endl;
    // cout << "Before : ";
    // printList(head);
    // cout << endl;
    // head = reverseKNode(head, 2);
    // cout << "After : ";
    // printList(head);
    // cout << endl;

    /*---------------------------------------------------------
    ------------------------------------------------------------
    ----------------------------------------------------------------
    -----------------------------------------------------------------------
    -----------------------------------------------------------------------
    ---------------------------------------------------------------------------
    ---------------------------------------------------------------------------*/

    Node *head = NULL;
    Node *tail = NULL;

    head = new Node(10);
    Node *first = new Node(20);
    Node *second = new Node(30);
    Node *third = new Node(40);
    Node *fourth = new Node(50);
    Node *fifth = new Node(60);
    Node *sixth = new Node(70);
    Node *seventh = new Node(80);
    Node *eighth = new Node(90);
    Node *ninth = new Node(20);
    tail = new Node(40);

    // head->next = first;
    // first->next = second;
    // second->next = third;
    // third->next = fourth;
    // fourth->next = fifth;
    // fifth->next = sixth;

    // cout << "Before : ";
    // printList(head);
    // cout << endl;

    // Check Linked List is circular or not

    // Detect Presence of Loop within Linked List or not

    head->next = first;
    first->next = second;
    second->next = third;
    third->next = fourth;
    fourth->next = fifth;
    fifth->next = sixth;
    sixth->next = seventh;
    seventh->next = eighth;
    eighth->next = ninth;
    ninth->next = tail;
    tail->next = fifth;

    cout << endl;
    cout << "Presence of Loop by Floyd's Cycle Algo(FCD): ";
    cout << checkForLoop(head);
    cout << endl;

    // Find the starting point of the Loop

    cout << endl;
    cout << "Starting Point of Loop : ";
    cout << startingPoint(head)->data;
    cout << endl;

    // Deletion of Loop

    cout << endl;
    cout << "After Deletion : ";
    removeLoop(head);
    printList(head);
    cout << endl;
    cout << endl;

    return 0;
}