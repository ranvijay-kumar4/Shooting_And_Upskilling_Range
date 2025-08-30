DATABASE
It is a collection of related data that is stored in a structured format. It allows for efficient data management and retrieval.

DBMS 
A Database Management System (DBMS) is software that interacts with the database. It provides a systematic way to create, retrieve, update, and manage data.

Types of DBMS

1. Relational DBMS (RDBMS): Uses a table-based structure to store data. Examples include MySQL, PostgreSQL, and Oracle.

2. NoSQL DBMS: Designed for unstructured data and can handle large volumes of data. Examples include MongoDB, Cassandra, and Redis.

SQL 
SQL (Structured Query Language) is a standard programming language used to manage and manipulate relational databases. It allows users to perform CRUD operations (Create, Read, Update, Delete) on the data.

TABLE 
A table is a collection of inter-related data entries that consists of rows and columns. 
Each row represents a record, and each column represents a field in the record.

QUERIES 
Queries are requests for data or information from a database. They are written in SQL and can be used to retrieve, insert, update, or delete data.

1. Creating Database : 
UPPERCASE & lowercase both are acceptable in SQL.

```sql
CREATE DATABASE database_name;
-- or
create database if not exists database_name;
```

CREATE DATABASE college;

2. USE DATABASE :
To select a database for use, you can use the following command:
```sql
USE database_name;  
```

USE college;

3. DELETING DATABASE : 
``` sql 
DROP DATABASE college;
```

DROP DATABASE college;

4. Creating Table :
To create a table, you define the table structure including columns and their data types. Here’s an example:

``` sql []
CREATE TABLE table_name (
    column1_name data_type constraints,
    column2_name data_type constraints,
    ...
);
```

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT NOT NULL
);

5. Inserting Data into Table :
To insert data into a table, you can use the INSERT INTO statement:
```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
-- OR
INSERT INTO table_name
VALUES (value1, value2, ...);
```
INSERT INTO students (id, name, age)
VALUES (1, 'Ranvijay', 28);
INSERT INTO students (id, name, age)
VALUES (2, 'Neha', 27);

INSERT INTO students VALUES(3, 'Ranvijay', 29);
INSERT INTO students VALUES(4, 'Neha', 28);

-- Primary key is unique, so you cannot insert a record with an existing primary key value.

6. Retrieving Data from Table :
To retrieve data from a table, you can use the SELECT statement:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
-- OR
SELECT * FROM table_name;
```
SELECT * FROM students;

Most used Data types in SQL:
- INT: Integer data type for whole numbers.
- VARCHAR(n): Variable-length string data type, where n is the maximum length.
- CHAR(n): Fixed-length string data type, where n is the length.
- FLOAT: Floating-point number data type for decimal values.
- DATE: Data type for date values.
- BOOLEAN: Data type for true/false values.

Types of SQL Commands:

1. Data Definition Language (DDL): Used to define the database structure.
   - Examples: CREATE, ALTER, DROP.
2. Data Manipulation Language (DML): Used to manipulate data within the database.
   - Examples: INSERT, UPDATE, DELETE.
3. Data Query Language (DQL): Used to query the database.
    - Example: SELECT.  

4. Data Control Language (DCL): Used to control access to data.
   - Examples: GRANT, REVOKE.
5. Transaction Control Language (TCL): Used to manage transactions in the database.
   - Examples: COMMIT, ROLLBACK, SAVEPOINT.

7. Database related Queries

 - CREATE DATABASE database_name;
 - CREATE DATABASE IF NOT EXISTS database_name;
 - USE database_name;
 - DROP DATABASE database_name;
 - DROP DATABASE IF EXISTS database_name;

- SHOW TABLES; 
-- To show all tables in the current database
- SHOW DATABASES;
-- To show all databases in the DBMS

8. Table related Queries

- CREATE TABLE table_name (
    column1_name data_type constraints,
    column2_name data_type constraints,
    ...
);
- CREATE TABLE IF NOT EXISTS table_name (
    column1_name data_type constraints,
    column2_name data_type constraints,
    ...
);

-- CREATE TABLE provides schema for the table, including column names and data types.

- DROP TABLE table_name;
- DROP TABLE IF EXISTS table_name;

SELECT * FROM table_name;
-- To select all records from a table

INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);

INSERT INTO table_name
VALUES (value1, value2, ...);
-- Generally used for inserting single record

-- PRIMARY KEY : It is a unique identifier for each record in a table. It ensures that no two records can have the same primary key value. Eg. - PRIMARY KEY (id), PRIMARY KEY (id, name)

-- It is a column or set of column in a table that uniquely identifies each row.
-- Must be unique and cannot contain NULL values.

-- FOREIGN KEY : A foreign key is a column or set of columns in one table that refers to the primary key in another table. It establishes a relationship between the two tables.

-- NOT NULL : A constraint that ensures a column cannot have NULL values. It is used to enforce that a field must contain a value.

-- UNIQUE : A constraint that ensures all values in a column are unique. It allows NULL values but no duplicate values.

-- DEFAULT : A constraint that provides a default value for a column when no value is specified during insertion. e.g.- salary INT DEFAULT 25000

-- CHECK : A constraint that ensures all values in a column satisfy a specific condition. It is used to enforce data integrity. E.g. - CHECK (age >= 18)

CREATE DATABASE college1;

USE college1;

CREATE TABLE student (
	rollno INT PRIMARY KEY,
	name VARCHAR(50),
	marks INT NOT NULL,
	grade VARCHAR(1),
	city VARCHAR(20)
);

INSERT INTO student (rollno, name, marks, grade, city) 
VALUES 
(101, "anil", 78, "C", "Pune"),
(102, "bhumika", 93, "A", "Pune"),
(103, "chetan", 85, "B", "Pune"),
(104, "dhruv", 96, "A", "Pune"),
(105, "emanuel", 12, "F", "Pune"),
(106, "farah", 82, "B", "Pune"),
(107, "sumit", 95, "A", "Pune"),
(108, "sunil", 20, "E", "Pune"),
(109, "akash", 80, "C", "Pune");


SELECT name, marks FROM student;

-- * is used to select all columns from a table.

SELECT * FROM student;

SELECT city FROM student;

SELECT DISTINCT city FROM student;
-- DISTINCT is used to select unique values from a column.


SELECT name, marks FROM student WHERE marks >= 80;
-- WHERE clause is used to filter records based on a specified condition.

SELECT * FROM student WHERE marks > 80 AND city = 'Pune';

SELECT * FROM student WHERE marks + 10 > 100;

SELECT * FROM student WHERE marks >= 80 OR city = 'Pune';

SELECT * FROM student WHERE marks >= 80 AND city = 'Pune';

SELECT * FROM student WHERE marks BETWEEN 80 AND 90;

SELECT * FROM student WHERE city IN ('Pune', 'Mumbai');
-- In operator is used to filter records based on a list of values.

SELECT * FROM student WHERE city NOT IN ('Pune', 'Mumbai');
-- NOT IN operator is used to filter records that do not match any value in a list.

SELECT * FROM student LIMIT 5;
-- Limit : It is used to specify the maximum number of records/rows to return in a result set.

SELECT * FROM student ORDER BY marks;
-- Order By : It is used to sort the result set in ascending or descending order based on one or more columns.

-- Aggregate Functions in SQL: That perform calculations on a set of values and return a single value.

-- COUNT(): Returns the number of rows that match a specified condition.
SELECT COUNT(*) FROM student;
SELECT COUNT(DISTINCT city) FROM student;

-- SUM(): Returns the total sum of a numeric column.
SELECT SUM(marks) FROM student;
SELECT SUM(DISTINCT marks) FROM student;

-- AVG(): Returns the average value of a numeric column.
SELECT AVG(marks) FROM student;
SELECT AVG(DISTINCT marks) FROM student;

-- MAX(): Returns the maximum value in a column.
SELECT MAX(marks) FROM student;

-- MIN(): Returns the minimum value in a column.
SELECT MIN(marks) FROM student;

-- Group By : It is used to group rows that have the same values in specified columns into summary rows, like "find the number of students in each city".
SELECT city, COUNT(name) FROM student GROUP BY city;
SELECT city, name, COUNT(name) FROM student GROUP BY city, name;

SELECT grade, AVG(marks) FROM student GROUP BY city ORDER BY AVG(marks) DESC;