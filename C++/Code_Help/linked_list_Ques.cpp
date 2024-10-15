#include <iostream>

using namespace std;

class node
{
public:
    int data;
    node *next;

    node(int data)
    {
        this->data = data;
        this->next = NULL; // Initialize next as NULL.
        // This line is important, it's used to indicate that this node is the end of the list.
        // If we don't initialize it, we'll get a runtime error when trying to access the next node.
        // It's also used to indicate that this node is the last node in the list.
        // This is important because the last node's next pointer should be NULL.
        // Otherwise, when we try to delete it, we'll get a runtime error.
        // This is because we can't delete a node that has a NULL next pointer.
        // If we don't initialize it, we'll get a runtime error when trying to delete it.
        // This is important because we can't delete a node that has a NULL next pointer.  // Otherwise
    };
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

node *getMiddle(node *&head)
{
    if (head == NULL || head->next == NULL)
    {
        return head;
        // If the list has only one node, return the head.
    }

    node *slow = head;
    // node *fast = head;
    // In Odd nodes gives middle as output and in even gives node of large index
    node *fast = head->next;
    // In Odd nodes gives middle as output and in even gives node of small index

    while (slow != NULL && fast != NULL)
    {
        fast = fast->next;
        if (fast != NULL)
        {
            fast = fast->next;
            slow = slow->next;
        }
    }
    return slow; // Returns the middle node
};

int getLength(node *head)
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

node *reverseKNodes(node *&head, int k)
{
    if (head == NULL)
    {
        cout << "LL is empty" << endl;
        return NULL;
    }
    int len = getLength(head);
    if (k > len)
    {
        // cout << "Enter valid value for k " << endl;
        return head;
    }

    // it means number of nodes in LL is >= k
    // Step A: reverse first k nodes of LL
    node *prev = NULL;
    node *curr = head;
    node *forward = curr->next;
    int count = 0;

    while (count < k)
    {
        forward = curr->next;
        curr->next = prev;
        prev = curr;
        curr = forward;
        count++;
    }

    // Step B: recursive call
    if (forward != NULL)
    {
        // we still have nodes left to reverse
        node *recursionKaAns = reverseKNodes(forward, k);
        head->next = recursionKaAns;
    }

    // step C: return head of the modified LL
    return prev;
};

int main()
{

    node *head = new node(10);
    node *second = new node(20);
    node *third = new node(30);
    node *fourth = new node(40);
    node *fifth = new node(50);
    node *sixth = new node(60);

    head->next = second;
    second->next = third;
    third->next = fourth;
    fourth->next = fifth;
    fifth->next = sixth;
    sixth->next = NULL;

    cout << endl;
    print(head); // Output: 10 20 30
    cout << endl;

    // --------------------------------------------------------------------------------------
    // Finding the Middle Node from the Linked List

    cout << "Middle Node : " << getMiddle(head)->data << endl;

    // --------------------------------------------------------------------------------------
    // Reversing Linked List in K groups
    cout << endl;
    head = reverseKNodes(head, 3);
    print(head); // Output: 30 20 10 60 50 40
    cout << endl;

    // --------------------------------------------------------------------------------------
    // Finding the Middle Node from the Linked List

    return 0;
}