// #include <bits/stdc++.h>
#include <iostream>
#include<queue>

using namespace std;

class Node
{
public:
    Node *left;
    int data;
    Node *right;

    Node(int data)
    {
        left = NULL;
        this->data = data;
        right = NULL;
    }
};

Node *buildTree() {
    int data;
    cout << "Enter the data: ";
    cin >> data;

    if(data == -1)
        return NULL;

    Node* root = new Node(data);
    
    cout << "Enter for Left part of " << data << endl;
    root->left = buildTree();

    cout << "Enter for Right part of " << data << endl;
    root->right = buildTree();

    return root;
};

void levelOderTraversal(Node* root){
    queue<Node*> q;
    q.push(root);
    
    while(!q.empty()){
        Node* temp = q.front();
        q.pop();

        cout << temp->data << " ";

        if(temp->left)
            q.push(temp->left);
        if(temp->right)
            q.push(temp->right);
        
    }
};

void inOrderTraversal(Node* root){
    if(root == NULL)
        return;

    inOrderTraversal(root->left);
    cout << root->data << " ";
    inOrderTraversal(root->right);
};

void preOrderTraversal(Node* root){
    if(root == NULL)
        return;

    cout << root->data << " ";
    preOrderTraversal(root->left);
    preOrderTraversal(root->right);
};

void postOrderTraversal(Node* root){
    if(root == NULL)
        return;

    postOrderTraversal(root->left);
    postOrderTraversal(root->right);
    cout << root->data << " ";
};

int treeHeight(Node* root){
    if(root == NULL)
        return 0;

    int left = treeHeight(root->left);
    int right = treeHeight(root->right);
    int ans = max(left, right) + 1;

    return ans;
};

int treeDiameter(Node* root){
    if(root == NULL)
        return 0;

    int opt1 = treeDiameter(root->left);
    int opt1 = treeDiameter(root->right);
    int opt3 = treeHeight(root->left) + treeHeight(root->right); // Count No of Edges(-------)
    // int opt3 = treeHeight(root->left) + 1 + treeHeight(root->right); // Count No of Nodes(O)
    int ans = max(opt1, max(opt2, opt3));

    return ans;
}

int main()
{
    Node* root = NULL;
    root = buildTree();
    
    cout << "Level Order : ";
    levelOderTraversal(root);

    cout << endl;
    cout << endl;

    cout << "Inorder : ";
    inOrderTraversal(root);

    cout << endl;
    cout << endl;

    cout << "Preorder : ";
    preOrderTraversal(root);

    cout << endl;
    cout << endl;

    cout << "Postorder : ";
    postOrderTraversal(root);

    cout << endl;
    cout << endl;

    cout << "Height of Tree : " << treeHeight(root);

    cout << endl;
    cout << endl;

    cout << "Diameter of Tree : " << treeDiameter(root);

    cout << endl;
    cout << endl;

    return 0;
}