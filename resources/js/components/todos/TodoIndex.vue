<template>
  <div>
    <div id="main">
      <h1>Todo list</h1>
      <ul class="list-group">
          <Todoitem  v-for="(i, index) in list" v-bind:key="index" v-bind:item ="i" v-bind:index="index" @idDelected="deleteEntry" @markDone="onClickDone" ></Todoitem>
        <!-- <li class="list-group-item" v-for="(i, index) in list" :key="index">
          <div v-bind:class="[i.status ? 'done' : 'undone']">
            <span class="fa fa-check" aria-hidden="true" v-on:click="onClickDone(i,index)"></span>
            task : {{i.name}}
            <br />
            created at : {{i.created_at|datetime}}
            <br />
            updated at: {{i.updated_at|datetime}}
            <button
              type="button"
              class="close"
              v-on:click="deleteEntry(i.id,index)"
            >×</button>
          </div>
        </li> -->
      </ul>
      <form class="form-inline" v-on:submit="add()">
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="add a new todo..."
          required
        />
        <button type="submit" class="btn btn-default btn-success ml-5">Add</button>
      </form>
    </div>
  </div>
</template>
<style scoped src="../../../css/todo.css">
</style>
<style scoped >
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
<script>
import Todoitem from "./Todoitem.vue";
export default {
  components: {
    Todoitem
  },
  data: function() {
    return {
      name: "",
      list: []
    };
  },
  mounted() {
    var app = this;
    axios
      .get("/api/v1/todos")
      .then(function(resp) {
        app.list = resp.data;
      })
      .catch(function(resp) {
        alert("Could not load todos");
      });
  },
  methods: {
    add() {
      var app = this;
     // event.preventDefault();
      var newtodo = {
        name: this.name,
        status: false
      };
      axios
        .post("/api/v1/todos", newtodo)
        .then(function(resp) {
          app.name = "";
          app.list.push(resp.data);
        })
        .catch(function(resp) {
          console.log(resp);
          alert("Could not create your todo");
        });
    },
    onClickDone(item, index) {
      var app = this;
      axios
        .patch("/api/v1/todos/" + item.id, item)
        .then(function(resp) {
          app.name = "";
          app.list.splice(index, 1, resp.data);
        })
        .catch(function(resp) {
          alert("Could not update todo");
        });
    },
    deleteEntry(id,index) {
        var app = this; 
       if (confirm("Do you really want to delete it?")) {
        axios
          .delete("/api/v1/todos/" + id)
          .then(function(resp) {
            app.list.splice(index, 1);
          })
          .catch(function(resp) {
              console.log(resp)
            alert("Could not delete this todo");
          });
       }
      
    }
  }
};
</script>