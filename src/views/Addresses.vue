<template>
  <page>
    <span slot="content">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">Meus endereços</h1>

        <button class="btn bg-gradient btn-sm text-white">
            <i class="fa fa-plus"></i> Novo
        </button>
      </div>
    
        <div class="card mb-3">
            <div class="card-body d-flex justify-content-between">
                <div>
                    <b>Casa</b><br>
                    Rua Jabuticabal, 347, Bairro Petrópolis<br>
                    Concórdia, Santa Catarina. 89803-306
                </div>
                <div class="card-buttons">
                    <button class="btn btn-danger text-extra-sm card-buttons my-1">
                    <i class="fa fa-trash"></i>
                  </button>
                    <button class="btn btn-warning text-extra-sm card-buttons my-1">
                    <i class="fa fa-edit"></i>
                  </button>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body d-flex justify-content-between">
                <div>
                    <b>Trabalho</b><br>
                    Rua Jabuticabal, 347, Bairro Petrópolis<br>
                    Concórdia, Santa Catarina. 89803-306
                </div>
                <div class="card-buttons">
                    <button class="btn btn-danger text-extra-sm card-buttons my-1">
                    <i class="fa fa-trash"></i>
                  </button>
                    <button class="btn btn-warning text-extra-sm card-buttons my-1">
                    <i class="fa fa-edit"></i>
                  </button>
                </div>
            </div>
        </div>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";
export default {
  components: {
    Page,
  }
};
</script>