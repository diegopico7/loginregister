const { response } = require("express");
const Employee = require("../models/EmployeeModel");

//mostrar la lista de empleados

const index = (req, res, next) => {
  Employee.find().then((response) => {
    res.json({
      response,
    });
  });
};

//mostrar un empleado
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID).then((response) => {
    res.json({
      response,
    });
  });
};
//guardar el empleado
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    mail: req.body.mail,
    phone: req.body.phone,
    age: req.body.age,
  });
  if (req.file) {
    employee.avatar = req.file.path;
  }
  employee.save().then((response) => {
    res.json({
      message: "Empleado registrado correctamente",
    });
  });
};

//editar empleado

const update = (req, res, next) => {
  let employeeID = req.body.employeeID;
  let updateData = {
    name: req.body.name,
    designation: req.body.designation,
    mail: req.body.mail,
    phone: req.body.phone,
    age: req.body.age,
  };
  Employee.findByIdAndUpdate(employeeID, { $set: updateData }).then(() => {
    res.json({
      message: "Empleado actualizado",
    });
  });
};

//borrar empleado
const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID).then(() => {
    res.json({
      message: "Empleado borrado correctamente",
    });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
