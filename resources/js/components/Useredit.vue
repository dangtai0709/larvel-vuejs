<template>
  <div class="container">
        <div class="form-group">
            <router-link to="/user" class="btn btn-default btn-success">Back</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Edit user</div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Name</label>
                            <input type="text" v-model="user.name" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Email</label>
                            <input type="text" v-model="user.email" class="form-control">
                        </div>
                    </div>
                     <div class="row">
                        <div class="col-xs-12 form-group">
                           <label class="control-label">Select company:</label>
                            <select class="form-control"  v-model="user.companyid" >
                             <option value='' disabled selected>Please select one</option>
                             <option  v-for="company in companies"  :key="company.id" >{{company.name}}</option>
                             
                            </select>
                        </div>
                    </div>
                      <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Password</label>
                            <input type="password" v-model="user.password" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <button class="btn btn-success">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            let app = this;
            let id = app.$route.params.id;
            app.userID = id;
            axios.get('/api/v1/users/' + id)
                .then(function (resp) {
                    app.user = resp.data;
                })
                .catch(function () {
                    alert("Could not load your users")
                });
            axios.get('/api/v1/companies')
                .then(function (resp) {
                    app.companies = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load companies");
                });    
        },
        data: function () {
            return {
                userID: null,
                companies: [],
                user: {
                    name: '',
                    email: '',
                    password:'',
                    companyid:''
                }
            }
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var user = app.user;
                axios.patch('/api/v1/users/' + app.userID, user)
                    .then(function (resp) {
                        app.$router.replace('/user');
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not create your user or email exist");
                    });
            }
        }
    }
</script>