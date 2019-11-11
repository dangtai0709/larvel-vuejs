/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router';
window.Vue.use(VueRouter);

import UserIndex from './components/Userlist.vue';
import Useredit from './components/Useredit.vue';
import UserCreate from './components/UserCreate.vue';
import Home from './components/Home.vue';
import CompaniesIndex from './components/companies/CompaniesIndex.vue';
import CompaniesCreate from './components/companies/CompaniesCreate.vue';
import CompaniesEdit from './components/companies/CompaniesEdit.vue';
///
import TodoIndex from './components/todos/TodoIndex.vue';
const routes = [
    {path: '/', component: Home , name: 'Home'},
    {
        path: '/user',
        component:  UserIndex, name: 'UserIndex'
    },
     {path: '/user/create', component:UserCreate , name: 'UserCreate'},
     {path: '/user/edit/:id', component: Useredit, name: 'Useredit'},
    {
     path: '/companies',
        component:  CompaniesIndex,name: 'companiesIndex'
    },
    {path: '/companies/create', component: CompaniesCreate, name: 'createCompany'},
    {path: '/companies/edit/:id', component: CompaniesEdit, name: 'editCompany'},
    {
        path: '/todos',
           component:  TodoIndex,name: 'todoIndex'
       },
]

const router = new VueRouter({ routes })

const app = new Vue({ router }).$mount('#app')