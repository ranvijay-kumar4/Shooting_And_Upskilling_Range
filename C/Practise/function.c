#include <stdio.h>

int add(int a, int b);
int main()
    
{
    
    int a=2, b=3, c;
    c=add(a, b);
    printf("%d", c);
    
  return 0;
    
}
int add (int a, int b)
{
    return a+b;
}