INSERT INTO department (
  name) VALUES('sales'),
  ('amdin'), ('IT');

INSERT INTO roles (title, salary, department_id) VALUES
 ('Manager',100879,1),
  ('Manager',100879,2),
   ('Manager',100879,3),
    ('Intern',75000,1),
  ('Intern',75000,2),
   ('Intern',75000,3);   

INSERT INTO employees
  (first_name, last_name, role_id,manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, NULL),
  ('Piers', 'Gaveston', 3,NULL),
  ('Charles', 'LeRoi', 4,1),
  ('Katherine', 'Mansfield', 5,2),
  ('Dora', 'Carrington', 6,3),
  ('Edward', 'Bellamy', 5,2),
  ('Montague', 'Summers', 6,3),
  ('Octavia', 'Butler', 4,1),
  ('Unica', 'Zurn', 1,NULL);