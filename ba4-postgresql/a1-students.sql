-- ACTIVITY 3 - A1

-- Note: Blocks of code to test one by one are separated by long line of hypens.

--------------------

create table students (
id integer primary key,
first_name character varying(255) not null,
middle_name character varying(255) not null,
last_name character varying(255) not null,
age numeric(3,0) default 1,
location text
);

insert into
students (id, first_name, middle_name, last_name, age, location)
values
(1, 'Juan', 'Blank', 'Cruz', 18, 'Manila'),
(2, 'Anne', 'Blank', 'Wall', 20, 'Manila'),
(3, 'Theresa', 'Blank', 'Joseph', 21, 'Manila'),
(4, 'Issac', 'Blank', 'Gray', 19, 'Laguna'),
(5, 'Zack', 'Blank', 'Matthews', 22, 'Marikina'),
(6, 'Finn', 'Blank', 'Lam', 25, 'Manila');

select * from students;

--------------------

update students set
first_name = 'Ivan',
middle_name = 'Ingram',
last_name = 'Howard',
age = 25,
location = 'Bulacan'
where id = 1;

select * from students order by id asc;

--------------------

delete from students where id = 6;

select * from students order by id asc;
