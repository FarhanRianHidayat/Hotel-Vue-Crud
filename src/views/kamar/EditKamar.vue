<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT KAMAR</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Kategori</label>
                                <input type="text" class="form-control" v-model="post.kategori_id" placeholder="Masukkan Kategori">
                                <!-- validation -->
                                <div v-if="validation.kategori_id" class="mt-2 alert alert-danger">
                                    {{ validation.kategori_id[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Jumlah Kamar</label>
                                <input type="text" class="form-control" v-model="post.jumlah_kamar" placeholder="Masukkan Jumlah Kamar">
                                <!-- validation -->
                                <div v-if="validation.jumlah_kamar" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah_kamar[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">Harga</label>
                                <textarea class="form-control" rows="4" v-model="post.harga" placeholder="Masukkan Harga"></textarea>
                                <!-- validation -->
                                <div v-if="validation.harga" class="mt-2 alert alert-danger">
                                    {{ validation.harga[0] }}
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
            kategori_id: '',
            jumlah_kamar: '',
            harga: ''
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
            axios.get(`http://localhost:8000/api/kamar/${route.params.id}`)
            .then(response => {
              
              //assign state posts with response data
              post.kategori_id    = response.data.data.kategori_id  
              post.jumlah_kamar  = response.data.data.jumlah_kamar  
              post.harga  = response.data.data.harga
                

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method update
        function update() {

            let kategori_id   = post.kategori_id
            let jumlah_kamar = post.jumlah_kamar
            let harga = post.harga

            axios.put(`http://localhost:8000/api/hotel/${route.params.id}`, {
                kategori_id: kategori_id,
                jumlah_kamar: jumlah_kamar,
                harga: harga
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'kamar.index'
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