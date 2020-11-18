const fs = require("fs");
require("colors");

let listadoPorhacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorhacer);
    fs.writeFile("db/data.json", data, err => {
        if (err) throw new Error("No se pudo grabar", err);
        else console.log("Se guardo correctamente");
    });
};

const cargarDB = () => {
    try {
        listadoPorhacer = require("../db/data.json");
    } catch (err) {
        listadoPorhacer = [];
    }
};

const getListado = (completado) => {
    cargarDB();
    let tareas = listadoPorhacer.filter((tarea) => tarea.completado.toString() === completado);
    return (typeof completado !== "boolean") ? tareas : listadoPorhacer;
};

const crear = descripcion => {
    cargarDB();
    let porhacer = {
        descripcion,
        completado: false
    };
    listadoPorhacer.push(porhacer);
    guardarDB();
    return porhacer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorhacer.findIndex((tarea) => tarea.descripcion === descripcion); // Me trae la position si machea sino -1
    if (index >= 0) {
        listadoPorhacer[index].completado = completado
        guardarDB();
        return true
    } else {
        return false
    }

};

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorhacer.filter((tarea) => tarea.descripcion !== descripcion);

    if (nuevoListado === listadoPorhacer) {
        return false
    } else {
        listadoPorhacer = nuevoListado;
        guardarDB();
        return true
    };
};


module.exports = { crear, getListado, actualizar, borrar };