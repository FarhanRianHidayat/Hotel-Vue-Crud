<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH KATEGORI</h4>
            <hr />

            <form @submit.prevent="store">
              <div class="form-group">
                <label for="title" class="font-weight-bold">Kategori</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="post.kategori"
                  placeholder="Masukkan Kategori"
                />
                <!-- validation -->
                <div v-if="validation.kategori" class="mt-2 alert alert-danger">
                  {{ validation.kategori[0] }}
                </div>
              </div>
              <div class="form-group mt-3">
                <label for="content" class="font-weight-bold">Nama Hotel</label>
                <!-- <select v-model="selected">
                  <option v-for="kate in kates" :value="kate.hotel.id">
                    {{ kate.hotel.nama_hotel }}
                  </option>
                </select> -->
                <select class="form-select" v-model="post.hotel_id">
                  <option  v-for="hotel in hotels" :value="hotel.id" v-bind:key="hotel.id">{{ hotel.nama_hotel }}</option>
                </select>
                <!-- validation -->
                <div v-if="validation.hotel_id" class="mt-2 alert alert-danger">
                  {{ validation.hotel_id[0] }}
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
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //state posts
    const post = reactive({
      kategori: "",
      hotel_id: "",
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function store() {
      let kategori = post.kategori;
      let hotel_id = post.hotel_id;

      axios
        .post("http://localhost:8000/api/kategori", {
          kategori: kategori,
          hotel_id: hotel_id,
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "kategori.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }
    //reactive state
    let kates = ref([]);
    let hotels = ref([]);

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

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/hotel")
        .then((response) => {
          //assign state posts with response data
          hotels.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //return
    return {
      post,
      kates,
      hotels,
      validation,
      router,
      store,
    };
  },
};
</script>

<style>
body {
  background: lightgray;
}
</style>
