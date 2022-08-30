<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH KAMAR</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Kategori</label>
                                <select class="form-select" v-model="post.kategori_id">
                                    <option v-for="kate in kates" :value="kate.id" v-bind:key="kate.id">
                                        {{ kate.kategori }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.kategori_id" class="mt-2 alert alert-danger">
                                    {{ validation.kategori_id[0] }}
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <label for="title" class="font-weight-bold">Jumlah Kamar</label>
                                <input type="text" class="form-control" v-model="post.jumlah_kamar"
                                    placeholder="Masukkan Jumlah Kamar">
                                <!-- validation -->
                                <div v-if="validation.jumlah_kamar" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah_kamar[0] }}
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <label for="content" class="font-weight-bold">Harga</label>
                                <input type="text" class="form-control" v-model="post.harga"
                                    placeholder="Masukkan Harga">
                                <!-- validation -->
                                <div v-if="validation.harga" class="mt-2 alert alert-danger">
                                    {{ validation.harga[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">SIMPAN</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        reactive,
        ref,
        onMounted
    } from 'vue'
    import {
        useRouter
    } from 'vue-router'
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

            //method store
            function store() {

                let kategori_id = post.kategori_id
                let jumlah_kamar = post.jumlah_kamar
                let harga = post.harga

                axios.post('http://localhost:8000/api/kamar', {
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
            //reactive state
            let kates = ref([]);

            //mounted
            onMounted(() => {
                //get API from Laravel Backend
                axios
                    .get("http://localhost:8000/api/kategori")
                    .then((response) => {
                        //assign state posts with response data
                        kates.value = response.data.data;
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
            });

            //return
            return {
                post,
                kates,
                validation,
                router,
                store
            }

        }

    }
</script>

<style>
    body {
        background: lightgray;
    }
</style>