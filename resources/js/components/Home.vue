<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">List</div>

                    <div class="card-body">
                      <router-link to="/companies" class="btn btn-default">Companies</router-link>
                    </div>
                    <div class="card-body">
                      <router-link to="/user" class="btn btn-default">User</router-link>
                    </div>
                     <div class="card-body">
                      <router-link to="/todos" class="btn btn-default">To do list</router-link>
                    </div>
                    <router-view ></router-view>
                </div>
                <Props title="Giới thiệu về Vue"></Props>
                <Props title="Các khái niệm trong Vue"></Props>
              
            </div>
        </div>
    </div>
</template>

<script>
import Props from './test/props.vue';
import UserIndex from './Userlist.vue';
    export default {
        components:{
            Props,
            UserIndex
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
