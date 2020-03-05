
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")

// CREATING MY CONNECTION TO SQL DATABASE
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employee_DB"
});

// CONNECT TO THE MYSQL SERVER AND SQL DATABASE
connection.connect(function(err){
    if (err) throw err;
    startApp();
})

function startApp() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "Welcome to the Employee database. What do you want to look at?",
        choices: [
                "View all Employees",
                "View all Departments",
                "View all Roles",
                "Add an Employee",
                "Add Department",
                "Add a Role",
                "Leave"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View all Employees":
                viewEmployees();
                break;
            case "View all Departments":
                viewDepartments();
                break;
            case "View all Roles":
                viewRoles();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Leave": 
                endApp();
                break;
            default:
                break;
        }
    })
}

function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table('All Employees:', res); 
    startApp();
    })
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
    if(err)throw err;
    console.table('All Departments:', res);
    startApp();
    })
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
    if (err) throw err;
    console.table('All roles:', res);
    startApp();
    })
}

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input", 
                message: "Employee's first name: ",
            },
            {
                name: "last_name",
                type: "input", 
                message: "Employee's last name: "
            },
            {
                name: "role", 
                type: "list",
                choices: function() {
                var roleArray = [];
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                }
                return roleArray;
                },
                message: "What is this Employee's role? "
            }
            ]).then(function (answer) {
                let roleID;
                for (let j = 0; j < res.length; j++) {
                if (res[j].title == answer.role) {
                    roleID = res[j].id;
                    console.log(roleID)
                }                  
                }  
                connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: roleID,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new Employee has been added!");
                    startApp();
                }
                )
            })
    })
}

function addDepartment() {
    inquirer
    .prompt([
        {
            name: "new_dept", 
            type: "input", 
            message: "What is the new Department you would like to add?"
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.new_dept
            }
        );
          var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        startApp();
        })
    })
}

function addRole() {
    connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;

    inquirer 
    .prompt([
        {
            name: "new_role",
            type: "input", 
            message: "What is the Title of the new Role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of this position? (Enter a number?)"
        },
        {
            name: "deptChoice",
            type: "rawlist",
            choices: function() {
                var deptArry = [];
                for (let i = 0; i < res.length; i++) {
                deptArry.push(res[i].name);
                }
                return deptArry;
            },
        }
    ]).then(function (answer) {
        let deptID;
        for (let j = 0; j < res.length; j++) {
            if (res[j].name == answer.deptChoice) {
                deptID = res[j].id;
            }
        }

        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.new_role,
                salary: answer.salary,
                department_id: deptID
            },
            function (err, res) {
                if(err)throw err;
                console.log("Your new Role has been added!");
                startApp();
            }
        )
    })
    })
    
}

function endApp() {
    connection.end();
}