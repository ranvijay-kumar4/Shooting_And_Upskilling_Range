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

