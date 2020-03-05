INSERT INTO department (name)
VALUES ("Accounting"), ("Engineering"),('Information Technology'), ("Marketing"), ("Customer Sales Represenative"),('Human Resources'),('Warehouse Managment');

INSERT INTO role (title, salary, department_id)
VALUES   ("Lead Accoutant", 73000, 1), 
         ("Accountant", 57000, 1), 
         ("Senior Engineer", 100000, 2), 
         ("Junior Developer", 75000, 2),
         ('IT Specialist',64000,3),
         ("Sales Specialist", 55000, 4),
         ('Marketing Coordinator', 58000, 4),
         ("Lead CSR", 69000, 5), 
         ("CSR", 520000, 5),
        ('Office Assistant', 400000, 6),
        ('Human Resource Manager', 78000, 6),
        ('Logistics Manager', 95000, 7),
        ('Warehouse Manager', 82000, 7),
        ('Warehouse Lead', 50000, 7),
        ('Warehouseman', 41000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  
        ("Lisa", "McDaniels", 1, null),
        ("Kelly", "Frasier", 1, null),
        ("Joe", "Smith", 2, null),
        ("Darius", "Acosta", 2, null),
        ("Jerry", "Sutton", 3, null),
        ("Natasha", "Graham", 3, null),
        ("Alex", "Barlow", 4, null),
        ("Louis", "Henderson", 4, null),
        ("Tanoa", "Jefferson", 5, null), 
        ("Nicole", "Craig", 5, null),
        ("Alexis", "Velasquez", 5, null),
        ("Shyann", "Bray", 5, null),
        ("Ashley", "Hansen", 6, null),
        ("Elizabeth", "Delacruz", 6, null),
        ("Tania", "Black", 7, null),
        ("Terry", "Howell",7, null),
        ("Jose", "Domingues", 7, null),
        ("Tyler", "Cobb", 7, null),
        ("Mathew", "Reyes", 7, null),
        ("Josheph", "Mcgee", 7, null),
        ("Cody", "Holt", 7, null);