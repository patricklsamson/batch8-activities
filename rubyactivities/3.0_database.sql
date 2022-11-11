-- ACTIVITY 3 - B1

-- Notes:
-- Blocks of code to test one by one are separated by long line of hypens.
-- Run everything from "ba3-postgresql/a1-students.txt" first before testing the block of codes below.

--------------------

select count(id) from students;

--------------------

select * from students where location = 'Manila';

--------------------

select avg(age) from students;

--------------------

select * from students order by age desc;
