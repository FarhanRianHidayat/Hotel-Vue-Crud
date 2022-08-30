<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT HOTEL</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Nama Hotel</label>
                                <input type="text" class="form-control" v-model="post.nama_hotel" placeholder="Masukkan Nama Hotel">
                                <!-- validation -->
                                <div v-if="validation.nama_hotel" class="mt-2 alert alert-danger">
                                    {{ validation.nama_hotel[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">Alamat</label>
                                <textarea class="form-control" rows="4" v-model="post.alamat" placeholder="Masukkan Alamat"></textarea>
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const post = reactive({
            nama_hotel: '',
            alamat: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/hotel/${route.params.id}`)
            .then(response => {
              
              //assign state posts with response data
              post.nama_hotel    = response.data.data.nama_hotel  
              post.alamat  = response.data.data.alamat  

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method update
        function update() {

            let nama_hotel   = post.nama_hotel
            let alamat = post.alamat

            axios.put(`http://localhost:8000/api/hotel/${route.params.id}`, {
                nama_hotel: nama_hotel,
                alamat: alamat
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'hotel.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            post,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>