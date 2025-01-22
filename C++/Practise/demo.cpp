#include <iostream>
using namespace std;

int main() {
      
    // Variable to the used as switch expression
    char x = 'A';

    // Switch statement with three cases
    switch (x) {
    case 'A':
        cout << "A";
        break;
    case 'B':
        cout << "B";
        break;
    default:
        cout << "Other than A and B";
        break;
    }
    return 0;
}