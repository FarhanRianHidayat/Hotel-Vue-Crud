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
              <div class="form-group">
                <label for="content" class="font-weight-bold">Nama Hotel</label>
                <td>
                  <!-- <select v-model="selected">
                    <option v-for="iya in posts" :value="iya.id">
                      {{ option.hotel.nama_hotel }}
                    </option>
                  </select> -->
                </td>
                <!-- validation -->
                <div v-if="validation.hotel_id" class="mt-2 alert alert-danger">
                  {{ validation.hotel_id[0] }}
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
import { reactive, ref } from "vue";
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
        .post("http://localhost:8000/api/hotel", {
          kategori: kategori,
          hotel_id: hotel_id,
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "hotel.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      post,
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
