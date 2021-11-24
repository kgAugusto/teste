var knex =  require("../database/database");

class Home{

    async findAll(){
        try {
            var result = await knex.select("*").table("materiais");
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async new(nome, descricao, marca, valor, data){
        try{
            await knex.insert({nome: nome, descricao: descricao, marca: marca, valor: valor, data: data}).table("materiais");
        }catch(err){
            return err.errno;
        }
     }

     async findById(id){
        try {
            var result = await knex.select("*").where({id: id}).table("materiais");
            if(result.length > 0){
                return result[0];
            }
            else{
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
    async update(id, nome, descricao, marca, valor){
        try{
            var result = await this.findById(id);
            if(result.length > 0){
                return;
            }
            else{
                await knex.raw(`UPDATE materiais SET nome = '`+nome+`', descricao = '`+descricao+`', marca = '`+marca+`', valor = '`+valor+`'  WHERE id = `+id+`;`)
                return{status: true}
            }
        }catch(err){
            console.log("erro aqui")
            console.log(err);
            return{status: false, err: err}
        }
    }


    async delete(id){
        var result = await this.findById(id);
        if(result != undefined){
            try{
                await knex.delete().where({id: id}).table("materiais");
                return {status:true}
            }
            catch(err){
                return {status:false, err: err}
            }
        }else{
            return {status:false, err:"O Materia não existe, portanto não pode ser deletado."}
        }
    }
}

module.exports = new Home();