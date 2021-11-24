<template>
  <div>
    <!--INICIO MODAL CADASTRO-->
    <div class="modal" :class="{'is-active': mostraCadastro}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Cadastro de Material</p>
            <button class="delete" aria-label="close" @click="cancela">></button>
          </header>
          <section class="modal-card-body">
            <label>Nome:</label>
            <input class="input is-rounded" type="text" v-model="obj.nome" placeholder="Digite Nome"><br>
            <label>Descrição</label>
            <input class="input is-rounded" type="text" v-model="obj.descricao" placeholder="Descrição">
            <label>Marca</label>
            <input class="input is-rounded" type="text" v-model="obj.marca" placeholder="Marca">
            <label>Valor</label>
            <input class="input is-rounded" type="text" v-model="obj.valor" placeholder="Valor">
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="ok">Cadastrar</button>
            <button class="button" @click="cancela">Cancel</button>
          </footer>
        </div>
      </div>
    <!--FIM MODAL CADASTRO--> 

    <!--INICIO MODAL EDITAR-->
    <div class="modal" :class="{'is-active': mostraEdit}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Atualiza de Material</p>
            <button class="delete" aria-label="close" @click="cancela">></button>
          </header>
          <section class="modal-card-body">
            <label>Nome:</label>
            <input class="input is-rounded" type="text" v-model="editNome" placeholder="Digite Nome"><br>
            <label>Descrição</label>
            <input class="input is-rounded" type="text" v-model="editDescricao" placeholder="Descrição">
            <label>Marca</label>
            <input class="input is-rounded" type="text" v-model="editMarca" placeholder="Marca">
            <label>Valor</label>
            <input class="input is-rounded" type="text" v-model="editValor" placeholder="Valor">
          </section>
          <footer class="modal-card-foot">
            <button class="button is-warning" @click="okEdit()">Atualizar</button>
            <button class="button" @click="cancela">Cancel</button>
          </footer>
        </div>
      </div>
    <!--FIM MODAL EDITAR--> 

    <!-- MODAL DE DELETAR--> 
      <div :class="{modal: true, 'is-active': mostraDell}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Você quer realmente deletar este Material?
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        Materiais deletados não há nenhuma possibilidade de recuperar
                    </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item" href="#" @click="okDell">Sim, eu quero</a>
                  <a class="card-footer-item" href="#"  @click="cancela">Cancelar</a>                    
                </footer>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="cancela"></button>
      </div>
      <!-- FIM MODAL DE DELETAR-->  


      <!-- MODAL DE Info--> 
      <div :class="{modal: true, 'is-active': mostraVisualiza}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Visualização
                    </p>
                </header>
                <div class="card-content">
                  <div class="control">
                    <input class="input" type="text" v-model="editNome" readonly>
                  </div>
                  <div class="control">
                    <input class="input" type="text" v-model="editDescricao" readonly>
                  </div>
                  <div class="control">
                    <input class="input" type="text" v-model="editMarca" readonly>
                  </div>
                  <div class="control">
                    <input class="input" type="text" v-model="editValor" readonly>
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item" href="#"  @click="cancela">OK</a>                    
                </footer>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="cancela"></button>
      </div>
      <!-- FIM MODAL DE Info--> 

    <!--MENU-->
    <button class="button is-info" @click="mostrarCadastro">Novo</button>
    <hr>

    <table class="table">
      <thead>
        <tr>
          <th><abbr title="Position">Nome</abbr></th>
          <th><abbr title="Position">Descrição</abbr></th>
          <th><abbr title="Position">Marca</abbr></th>
          <th><abbr title="Position">Valor</abbr></th>
          <th><abbr title="Position">Data</abbr></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!--<tr>-->
        <tr v-for="result in this.results" :key="result.id" >
          <td>{{result.nome}}</td>
          <td>{{result.descricao}}</td>
          <td>{{result.marca}}</td>
          <td>R${{result.valor}}</td>
          <td>{{result.data}}</td>
          <td><button class="button is-warning is-rounded is-small" @click="mostrarEdit(result.id)">Atualizar,</button></td>
          <td><button class="button is-info is-rounded is-small" @click="mostrarVisualiza(result.id)">Visualizar</button></td>
          <td><button class="button is-danger is-rounded is-small" @click="mostrarDelete(result.id)">Excluir</button></td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created(){
    axios.get("http://localhost:8080/").then(res=>{
        this.results = res.data;
      }).catch(err =>{
              console.log(err);
        });
  },
  data(){
    return{
      results: [],
      obj: {},
      mostraCadastro: false,
      mostraEdit: false,
      mostraDell: false,
      mostraVisualiza: false,
      valorEdit:{},
      editNome: '',
      editDescricao: '',
      editMarca:'',
      editValor:'',
      editId: undefined
    }
  },
  methods:{
    mostrarCadastro(){
      this.mostraCadastro = true
    },
    mostrarEdit(id){
      axios.get("http://localhost:8080/"+ id).then(res=>{
        this.editNome = res.data.nome;
        this.editDescricao = res.data.descricao;
        this.editMarca = res.data.marca;
        this.editValor = res.data.valor;
        this.editId = res.data.id;
      }).catch(err =>{
              console.log(err);
        });
      this.mostraEdit = true;
    },
    mostrarDelete(id){
      this.editId = id;
      this.mostraDell = true;
    },
    mostrarVisualiza(id){
      axios.get("http://localhost:8080/"+ id).then(res=>{
        this.editNome = res.data.nome;
        this.editDescricao = res.data.descricao;
        this.editMarca = res.data.marca;
        this.editValor = res.data.valor;
        this.editId = res.data.id;
      }).catch(err =>{
              console.log(err);
        });
      this.mostraVisualiza = true;
    },
    ok(){
      var data = new Date();
      var dia = String(data.getDate()).padStart(2, '0');
      var mes = String(data.getMonth() + 1).padStart(2, '0');
      var ano = data.getFullYear();
      var dataAtual = dia + '/' + mes + '/' + ano;
      axios.post("http://localhost:8080/",{
        nome: this.obj.nome,
        descricao: this.obj.descricao,
        marca: this.obj.marca,
        valor: this.obj.valor,
        data: dataAtual
      }).then(() =>{
              axios.get("http://localhost:8080/").then(res=>{
                this.results = res.data;
              }).catch(err =>{
                      console.log(err);
                });
              this.cancela();
          }).catch(err=>{
              var msgErro = err.response.data.err;
              this.error = msgErro;
          });
    },
    okEdit(){
      axios.put("http://localhost:8080/",{
      id: this.editId,
      nome: this.editNome,
      descricao: this.editDescricao,
      marca: this.editMarca,
      valor: this.editValor
    }).then(() =>{
      console.log("entrei aqui ")
      axios.get("http://localhost:8080/").then(res=>{
        this.results = res.data;
      }).catch(err =>{
          console.log(err);
        });
        this.cancela();
    }).catch(err=>{
        var msgErro = err.response.data.err;
        this.error = msgErro;
    })
    },
    okDell(){
      axios.delete("http://localhost:8080/"+ this.editId).then(()=>{
          axios.get("http://localhost:8080/").then(res=>{
                this.results = res.data;
          }).catch(err =>{
                  console.log(err);
            });
          this.mostraDell = false;
      }).catch(err=>{
          console.log(err);
          this.mostraDell = false;
      });
    },
    cancela(){
      this.obj.nome = '';
      this.obj.descricao = '';
      this.obj.marca = '';
      this.obj.valor = '';
      this.obj.data = '';
      this.mostraCadastro = false;
      this.mostraEdit = false;
      this.mostraDell = false;
      this.mostraVisualiza = false;
    }
  }
}
</script>
