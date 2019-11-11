<template>
  <div>
    <div class="form-group">
      <router-link :to="{name: 'UserCreate'}" class="btn btn-xs btn-default btn-success">Create User</router-link>
      <router-link to="/" class="btn btn-default btn-success">Back</router-link>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading" v-if="selectedUser.length">User list selected</div>
      <div v-for=" (user,index) in selectedUser" :key="user.id" class="text-justify text-center">
        <span>{{user.name}} - ID: {{user.id}}</span>
        <a href="#" v-on:click="deleteSelectedUser(user.id, index)">Delete</a>
      </div>
    </div>
    <div class="panel-heading">User list</div>
    <div class="panel-body">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Email verify at</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th width="100">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(users, index) in users" :key="index">
            <td>
              <a @click="UserDetail(users)">{{index}}</a>
            </td>
            <td>{{ users.name }}</td>
            <td>{{ users.email_verified_at }}</td>
            <td>{{ users.email }}</td>
            <td>{{ users.created_at }}</td>
            <td>{{ users.updated_at }}</td>
            <td>
              <router-link
                :to="{name: 'Useredit', params: {id: users.id}}"
                class="btn btn-xs btn-default"
              >Edit</router-link>
              <a
                href="#"
                class="btn btn-xs btn-danger"
                v-on:click="deleteEntry(users.id, index)"
              >Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
      <UserDetail :userDetailInfo="userSelectedFromChild" @userSelected="childrenSelectUser"></UserDetail>
    </div>
  </div>
</template>

<script>
import UserDetail from "./test/UserDetail.vue";
export default {
  components: {
    UserDetail
  },
  data: function() {
    return {
      selectedUser: [],
      userSelectedFromChild: {},
      users: []
    };
  },
  mounted() {
    var app = this;
    axios
      .get("/api/v1/users")
      .then(function(resp) {
        app.users = resp.data;
      })
      .catch(function(resp) {
        console.log(resp);
        alert("Could not load users");
      });
  },
  methods: {
    deleteEntry(id, index) {
      if (confirm("Do you really want to delete it?")) {
        var app = this;
        axios
          .delete("/api/v1/users/" + id)
          .then(function(resp) {
            app.users.splice(index, 1);
          })
          .catch(function(resp) {
            alert("Could not delete users");
          });
      }
    },
    deleteSelectedUser(id, index) {
      this.selectedUser.splice(index, 1);
    },
    childrenSelectUser(user) {
      var app = this;
      app.selectedUser.push(user);
      this.userSelectedFromChild = [];
    },
    UserDetail(user) {
      this.userSelectedFromChild = user;
    }
  }
};
</script>
