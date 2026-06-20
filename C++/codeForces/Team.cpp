#include<bits/stdc++.h>
 
using namespace std;
 
int main(){
    int row;
    cin >> row;
    int ans = 0;
    
    for(int i = 0; i < row; i++){
        int val1, val2, val3;
        cin >> val1 >> val2 >> val3;
 
        if(val1 + val2 + val3 >= 2)
            ans++;
    }
    
    
    cout << ans;
    
    return 0;
}