-- Create base
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'StudentDB')
BEGIN
    CREATE DATABASE StudentDB;
END
GO

USE StudentDB;
GO

-- Create table Students
IF NOT EXISTS (SELECT * FROM sys.objects WHERE name = 'Students' AND type = 'U')
BEGIN
    CREATE TABLE Students (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        Course NVARCHAR(100) NOT NULL
    );
END
GO
