const express = require("express");

const router = express.Router();

const { 
    cadastrar, 
    listar, 
    buscar, 
    atualizar, 
    excluir } = require("../controllers/aula.controller");

router.post('/cadastrar/turmas/:turmaId/aulas', cadastrar);
router.get("/listar/turmas/:turmaId/aulas", listar);
router.get("/buscar/:id", buscar);
router.put("/atualizar/:id", atualizar);
router.delete("/excluir/:id", excluir);

module.exports = router;
