<template>
  <li class="list-group-item">
    
    <div v-bind:class="[item.status ? 'done' : 'undone']">
     <span class="fa fa-check" aria-hidden="true"  v-if="!edit" v-on:click="onClickDone(item,index)"></span>
     <button type="button" class="close" v-if="!edit"  v-on:click="deleteEntry(item.id,index)">×</button>
     <button type="button" class="close" v-if="!edit" v-on:click="editTask()"><i class="fa fa-pencil"></i></button>
      <span v-if="!edit">task : {{item.name}}
          <p>
           created at : {{item.created_at|datetime}}
           <br>
          updated at: {{item.updated_at|datetime}}
          </p>  
      </span>
      
    </div>
    <div v-if="edit">
      <form class="form-inline" v-on:submit="updateTask(item,index)">
        <input
          type="text"
          class="form-control"
          v-model="item.name"
          placeholder="add a new todo..."
          required
        />
        <button type="submit" class="btn btn-default btn-success ml-5">Save</button>
      </form>
    </div>
  </li>
</template>
<style scoped src="../../../css/todo.css">
</style>
<style scoped >
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
<script>
export default {
  props: {
    index: "",
    item: {
      type: Object
    }
  },
  data: function() {
    return {
     edit:false
    };
  },
  filters: {
    datetime: function(value) {
      const parts = value.split(/[- :]/);
      const wanted = `${parts[2]}/${parts[1]}/${parts[0]} ${parts[3]}:${
        parts[4]
      }`;
      return wanted;
    }
  },
  methods: {
    onClickDone(item, index) {
      item.status = item.status ? 0 : 1;
      this.$emit("markDone", item, index);
    },
    editTask(){
        this.edit=!this.edit;
    },
    updateTask(item, index) {
     this.edit=false;
     this.$emit("markDone", item, index);
    },
    deleteEntry(id, index) {
      this.$emit("idDelected", id, index);
    }
  }
};
</script>