-- ACTIVITY 3.1 - A1

-- Notes:
-- Blocks of code to test one by one are separated by long line of hypens.
-- Run everything from "ba3-postgresql/a1-students.txt" first before testing the block of codes below.

--------------------

create table classrooms (
id integer primary key,
student_id numeric(2,0) default 1,
section text
);

insert into
classrooms (id, student_id, section)
values
(1, 1, 'A'),
(2, 2, 'A'),
(3, 3, 'B'),
(4, 4, 'C'),
(5, 5, 'B'),
(6, 6, 'A'),
(7, 7, 'C'),
(8, 8, 'B'),
(9, 9, 'B'),
(10, 10, 'C');

select s.first_name, s.middle_name, s.last_name, c.section from students s inner join classrooms c on c.student_id = s.id;

--------------------

select s.first_name, s.middle_name, s.last_name, c.section from students s left join classrooms c on c.student_id = s.id;

--------------------

select s.first_name, s.middle_name, s.last_name, c.section from students s right join classrooms c on c.student_id = s.id;

--------------------

select s.first_name, s.middle_name, s.last_name, c.section from students s full join classrooms c on c.student_id = s.id;
