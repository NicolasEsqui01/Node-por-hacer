let descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tareaa por hacer'
};

let completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};


const argv = require("yargs")
    .command("crear", "Crear un elemento por hacer", { descripcion })
    .command("actualizar", "Actualizar el estado completado de una tarea", { descripcion, completado })
    .command("borrar", "Se borro la tarea correctamente", { descripcion })
    .command("listar", "Listar las tareas", { completado })
    .help()
    .argv;


module.exports = { argv }