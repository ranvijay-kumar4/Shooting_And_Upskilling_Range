#include <iostream>
#include <vector>

// Backtracking is a special form of Recurssion.


// Map is just like Vector as well type of data structure having Key Value pair.

using namespace std;

void printPermutations(string &str, int i)
{
    if (i >= str.length())
    {
        cout << str << " ";
        return;
    }

    for (int j = i; j < str.length(); j++)
    {
        swap(str[i], str[j]);
        printPermutations(str, i + 1);
        // Backtrack
        swap(str[i], str[j]);
    }
};

bool isSafeMaze(int i, int j, int row, int col, int arr[][4], vector<vector<bool>> &visited)
{
    if (((i >= 0 && i < row) && (j >= 0 && j < col)) && (arr[i][j] == 1) && (visited[i][j] == false))
    {
        return true;
    }
    else
    {
        return false;
    }
}

void solveMaze(int arr[][4], int row, int col, int i, int j, vector<vector<bool>> &visited, vector<string> &path, string output)
{
    if (i == row - 1 && j == col - 1)
    {
        path.push_back(output);
        return;
    }

    // Down -> i+1, j
    if (isSafeMaze(i + 1, j, row, col, arr, visited))
    {
        visited[i + 1][j] = true;
        solveMaze(arr, row, col, i + 1, j, visited, path, output + 'D');
        // backtrack
        visited[i + 1][j] = false;
    }

    // Left -> i, j-1
    if (isSafeMaze(i, j - 1, row, col, arr, visited))
    {
        visited[i][j - 1] = true;
        solveMaze(arr, row, col, i, j - 1, visited, path, output + 'L');
        // backtrack
        visited[i][j - 1] = false;
    }

    // Right -> i, j+1
    if (isSafeMaze(i, j + 1, row, col, arr, visited))
    {
        visited[i][j + 1] = true;
        solveMaze(arr, row, col, i, j + 1, visited, path, output + 'R');
        // backtrack
        visited[i][j + 1] = false;
    }

    // Up-> i-1, j
    if (isSafeMaze(i - 1, j, row, col, arr, visited))
    {
        visited[i - 1][j] = true;
        solveMaze(arr, row, col, i - 1, j, visited, path, output + 'U');
        // backtrack
        visited[i - 1][j] = false;
    }
};

int main()
{
    // -----------Print Permutations of String---------------
    // string str = "abc";
    // int i = 0;
    // printPermutations(str, i);

    // -------------Rat in a Maze Problem GFG---------------
    // int maze[4][4] = {{1, 0, 0, 0},
    //                   {1, 1, 0, 1},
    //                   {1, 1, 0, 0},
    //                   {0, 1, 1, 1}};
    // if (maze[0][0] == 0)
    // {
    //     cout << " No Path Exist " << endl;
    //     return 0;
    // }

    // int row = 4, col = 4;
    // vector<vector<bool>> visited(row, vector<bool>(col, false));
    // visited[0][0] = true;
    // vector<string> path;
    // string output = "";

    // solveMaze(maze, row, col, 0, 0, visited, path, output);
    // cout << "Printing the result " << endl;
    // for (auto i : path)
    // {
    //     cout << i << " ";
    // }
    // cout << endl;
    // if (path.size() == 0)
    // {
    //     cout << " No Path Exists " << endl;
    // }

    // -------------N-Queen Problem Question No. 51 Leetcode---------------

    // -------------Generating Paranthesis Problem Question No. 22 Leetcode---------------

    // -------------Letter Combination of Keypad Phone Problem Question No. 17 Leetcode---------------

    // -------------Soduku Solver Problem Question No. 37 Leetcode---------------

    return 0;
}