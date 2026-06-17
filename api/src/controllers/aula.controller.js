const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const {turmaId} = req.params;
    const {titulo, conteudo} = req.body;

    const aula = await prisma.aula.create({
        data: {
            titulo,
            conteudo,
            turmaId: Number(turmaId)
        }
    });

    res.json(aula).status(200).end();
};

const listar = async (req, res) => {
    const lista = await prisma.aula.findMany({
        where: {
            turmaId: Number(req.params.turmaId)
        }
    });

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.aula.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.aula.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.aula.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}
