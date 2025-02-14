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

void print(Node *&head)
{
    Node *temp = head;

    while (temp != NULL)
    {
        cout << temp->data << " ";
        temp = temp->next;
    }
};

Node *reverse(Node *head)
{
    Node *prev = NULL;
    Node *curr = head;
    Node *after;
    while (curr != NULL)
    {
        after = curr->next;
        curr->next = prev;
        prev = curr;
        curr = after;
    }
    return prev;
};

bool checkPalindrome(Node *&head)
{
    if (head == NULL)
        return true;

    if (head->next == NULL)
        return true;

    Node *slow = head;
    Node *fast = head->next;

    while (fast != NULL)
    {
        fast = fast->next;
        if (fast != NULL)
        {
            slow = slow->next;
            fast = fast->next;
        }
    }

    // Slow will be at center
    Node *reverseNode = reverse(slow->next);
    slow->next = reverseNode;

    Node *ptr1 = head;
    Node *ptr2 = reverseNode;

    while (ptr2 != NULL)
    {
        if (ptr1->data != ptr2->data)
        {
            return false;
        }
        ptr1 = ptr1->next;
        ptr2 = ptr2->next;
    }
    return true;
};

void removeDuplicateSorted(Node *&head)
{
    if (head == NULL)
        return;

    if (head->next == NULL)
        return;

    Node *temp = head;
    while (temp != NULL)
    {
        if (temp->next != NULL && temp->data == temp->next->data)
        {
            Node *duplicate = temp->next;
            temp->next = temp->next->next;
            duplicate->next = NULL;
            delete duplicate;
        }
        else
        {
            temp = temp->next;
            // duplicate = temp;
        }
    }
};

void sortUsingLoop(Node *&head)
{
    if (head == NULL)
        return;

    if (head->next == NULL)
        return;

    Node *temp = head;
    int count0 = 0, count1 = 0, count2 = 0;
    while (temp != NULL)
    {
        if (temp->data == 0)
            count0++;

        if (temp->data == 1)
            count1++;

        if (temp->data == 2)
            count2++;

        temp = temp->next;
    }

    temp = head;
    while (count0--)
    {
        temp->data = 0;
        temp = temp->next;
    }
    while (count1--)
    {
        temp->data = 1;
        temp = temp->next;
    }
    while (count2--)
    {
        temp->data = 2;
        temp = temp->next;
    }
};

Node *sortUsingPointer(Node *&head)
{
    if (head == NULL || head->next == NULL)
        return head;

    Node *headZero = new Node(-1);
    Node *zeroTail = headZero;
    Node *headOne = new Node(-1);
    Node *oneTail = headOne;
    Node *headTwo = new Node(-1);
    Node *twoTail = headTwo;

    Node *curr = head;
    while (curr != NULL)
    {
        if (curr->data == 0)
        {
            Node *temp = curr;
            curr = curr->next;
            temp->next = NULL;

            zeroTail->next = temp;
            zeroTail = temp;
        }

        if (curr->data == 1)
        {
            Node *temp = curr;
            curr = curr->next;
            temp->next = NULL;

            oneTail->next = temp;
            oneTail = temp;
        }

        if (curr->data == 2)
        {
            Node *temp = curr;
            curr = curr->next;
            temp->next = NULL;

            twoTail->next = temp;
            twoTail = temp;
        }
    }

    Node *temp = headOne;
    headOne = headOne->next;
    temp->next = NULL;
    delete temp;

    temp = headTwo;
    headTwo = headTwo->next;
    temp->next = NULL;
    delete temp;

    if (headOne != NULL)
    {
        zeroTail->next = headOne;

        if (headTwo != NULL)
            oneTail->next = headTwo;
    }
    else
    {
        if (headTwo != NULL)
        {
            zeroTail->next = headTwo;
        }
    }

    temp = headZero;
    headZero = headZero->next;
    temp->next = NULL;
    delete temp;

    return headZero;
};

Node *solve(Node *&head1, Node *&head2)
{

    if (head1 == NULL)
        return head2;
    if (head2 == NULL)
        return head1;

    // step1 : reverse both linked list
    head1 = reverse(head1);
    head2 = reverse(head2);

    // step2: add both linked list
    Node *ansHead = NULL;
    Node *ansTail = NULL;
    int carry = 0;

    while (head1 != NULL && head2 != NULL)
    {
        // calculate sum
        int sum = carry + head1->data + head2->data;
        // find digit to create node for
        int digit = sum % 10;
        // calculate carry
        carry = sum / 10;

        // create a new Node for the digit
        Node *newNode = new Node(digit);
        // attach the newNode into the answer wali linked list
        if (ansHead == NULL)
        {
            // first node insert krre ho
            ansHead = newNode;
            ansTail = newNode;
        }
        else
        {
            ansTail->next = newNode;
            ansTail = newNode;
        }
        head1 = head1->next;
        head2 = head2->next;
    }

    // jab head1 list ki length head2 list se jada hogi
    while (head1 != NULL)
    {
        int sum = carry + head1->data;
        int digit = sum % 10;
        carry = sum / 10;
        Node *newNode = new Node(digit);
        ansTail->next = newNode;
        ansTail = newNode;
        head1 = head1->next;
    }

    // jab head2 list ki length head1 list se jada hogi
    while (head2 != NULL)
    {
        int sum = carry + head2->data;
        int digit = sum % 10;
        carry = sum / 10;
        Node *newNode = new Node(digit);
        ansTail->next = newNode;
        ansTail = newNode;
        head2 = head2->next;
    }

    // handle carry ko alag se
    while (carry != 0)
    {
        int sum = carry;
        int digit = sum % 10;
        carry = sum / 10;
        Node *newNode = new Node(digit);
        ansTail->next = newNode;
        ansTail = newNode;
    }

    // step3: reverse the ans linked list
    ansHead = reverse(ansHead);
    return ansHead;
};

int main()
{
    Node *head = NULL;
    Node *tail = NULL;

    head = new Node(0);
    Node *first = new Node(2);
    Node *second = new Node(1);
    Node *third = new Node(0);
    Node *fourth = new Node(1);
    tail = new Node(2);

    head->next = first;
    first->next = second;
    second->next = third;
    third->next = fourth;
    fourth->next = tail;

    cout << endl;
    cout << "Linked List : ";
    print(head);
    cout << endl;
    cout << endl;

    // // Check Linked List is Palindrome or not
    // cout << "Is that List is Palindrome : ";
    // cout << checkPalindrome(head);

    cout << endl;

    // Remove Duplicate node from sorted linked list.
    removeDuplicateSorted(head);
    cout << "Removal of Duplicate Elements from Sorted List : ";
    print(head);

    cout << endl;
    cout << endl;

    /* Remove Duplicate node from Unsorted linked list.
        3 methods
            1 -> using 2 loop compare,
            2 -> using hashing or map,
            3 -> sort and remove
    */

    // Sort 0s, 1s, and 2s

    cout << "After Sorting 0s, 1s, 2s : ";
    sortUsingLoop(head);
    print(head);

    cout << endl;
    cout << endl;

    cout << "After Sorting Again using Pointer Method :";
    Node *newHead = sortUsingPointer(head);
    print(newHead);
    cout << endl;
    cout << endl;

    // Add Linked List

    Node *head1 = new Node(9);
    Node *second1 = new Node(9);
    head1->next = second1;

    Node *head2 = new Node(9);
    Node *second2 = new Node(9);
    // Node* third2 = new Node(4);
    head2->next = second2;
    // second2 -> next = third2;

    Node *ans = solve(head1, head2);

    print(ans);

    return 0;
}