--SELECT * from departments;
SELECT * from employees;

--SELECT d.id as departmentsId from employees e JOIN departments d on e.departmentid = d.id; 
SELECT d.id as departmentsId, sum(e.salary)/(SELECT COUNT(id) from employees GROUP by departmentid)as avgSalary from employees e JOIN departments d on e.departmentid = d.id GROUP BY d.id; 

SELECT sum(e.salary)/(SELECT COUNT(id) from employees GROUP by departmentid) as avgSalary  from departments d left JOIN employees e on e.departmentid = d.id GROUP BY d.id; 

INSERT INTO departments(id, name) VALUES(4, 'CEO');

1 -> 1100
2 -> 850
3 -> 1250

SELECT d.id as departmentsId, If(sum(e.salary)/(SELECT COUNT(id)as num from employees GROUP by departmentid) ISNULL, 0,num ) as avgSalary  from departments d left JOIN employees e on e.departmentid = d.id GROUP BY d.id;

SELECT d.id, 
ifnull(sum(e.salary)/(SELECT COUNT(id) from employees GROUP by departmentid),0) as avgSalary,
 from departments d 
 left JOIN employees e 
 on e.departmentid = d.id 
 GROUP BY d.id; 

SELECT d.id, 
ifnull(sum(e.salary)/(SELECT COUNT(id) from employees GROUP by departmentid),0) as avgSalary,
 CASE WHEN SELECT COUNT(id) from employees GROUP by departmentid > (SELECT sum(salary)/COUNT(id) THEN 'Above' ELSE 'hero_type', 
 FROM employees GROUP by id) 
 from departments d 
 left JOIN employees e 
 on e.departmentid = d.id 
 GROUP BY d.id; 



SELECT d.id, 
ifnull(AVG(e.salary),0) as avgSalary,
CASE
WHEN avgSalary > (SELECT AVG(salary) FROM employees) then 'Above'
WHEN avgSalary < (SELECT AVG(salary) FROM employees) then 'Below'
ELSE 'Equal'
 from departments d 
 left JOIN employees e 
 on e.departmentid = d.id 
 GROUP BY d.id; 




SELECT d.id, 
ifnull(AVG(e.salary),0) as avgSalary,
CASE
WHEN avgSalary > (SELECT AVG(salary) FROM employees) then 'Above'
WHEN avgSalary < (SELECT AVG(salary) FROM employees) then 'Below'
ELSE 'Equal'
END AS status
 from departments d 
 left JOIN employees e 
 on e.departmentid = d.id 
 GROUP BY d.id; 





SELECT d.id, 
ifnull(AVG(e.salary),0) as avgSalary,
CASE
WHEN ifnull(AVG(e.salary),0) > (SELECT AVG(salary) FROM employees) then 'Above'
WHEN ifnull(AVG(e.salary),0) < (SELECT AVG(salary) FROM employees) then 'Below'
ELSE 'Equal'
END AS status
 from departments d 
 left JOIN employees e 
 on e.departmentid = d.id 
 GROUP BY d.id; 
