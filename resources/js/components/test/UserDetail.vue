<template>
    <div class="user-detail" >
        <div class="user-detail-container" v-if="Object.keys(userDetailInfo).length !== 0">
        <a href="#" class="btn btn-xs btn-danger" @click="selectUser(userDetailInfo)" >  select </a>
            <div class="user-name">
                Name: {{ userDetailInfo.name }} 
            <div class="user-email">
                Email: {{ userDetailInfo.email }}
            </div>
            <div class="user-dob">
                company: {{ userDetailInfo.company }}
            </div>
            <div class="user-gender">
                Password: {{ userDetailInfo.password }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        props: {
            userDetailInfo: {
                type: Object
            }
        },
         methods: {
            // This line below
            selectUser(user) {
                this.$emit('userSelected', user)
                this.props.userDetailInfo=[];
            }
        }
    }
</script>

