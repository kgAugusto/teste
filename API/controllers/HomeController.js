var Home = require ("../models/Home");
class HomeController{

    async index(req, res){
        var result = await Home.findAll();
        console.info(result);
        res.json(result);
    }

    async new(req, res){
        var {nome, descricao, marca, valor, data} = req.body;
        
        if( (nome, descricao, marca, valor, data == undefined) || (descricao, marca, valor, data == '') || (descricao, marca, valor, data == ' ')){    
            res.status(400);
            res.json({err: "OS DADOS SÃO INVALIOS"});
            return;
        }
        else{
            var resultInsert = await Home.new(nome, descricao, marca, valor, data);
            res.status(200);
            res.json(resultInsert);
        }
    }

    async findId(req, res){
        var id = req.params.id;
        var result = await Home.findById(id);
        if(result == undefined){
            res.status(404);
            res.json({});
        }
        else{
            res.status(200);
            res.json(result)
        }
    }


    async edit(req, res){
        var {id,nome, descricao, marca, valor} = req.body;
        if(nome, descricao, marca, valor == ''){
            //erro preencha o campo
            res.status(400);
            return;
        }
        else{
            var result =  await Home.update(id, nome, descricao, marca, valor);
            console.log(result.status);
            res.status(200);
            res.json(result);
        }
    }

    async remove(req, res){
        var id = req.params.id;
        var result =  await Home.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo ok!");
        }
        else{
            res.status(406);
            res.send(result.err);
        }
    }

}

module.exports = new HomeController();