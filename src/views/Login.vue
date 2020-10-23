<template>
  <div>
    <div class="w-100 full-height bg-vegetables"></div>

    <div class="container-fluid full-height">
      <div class="row justify-content-center full-height align-items-center">
        <div class="col-12 col-md-6 col-lg-4 text-center">
          <h4 class="mb-4">Bem-vindo(a) ao Locavore!</h4>

          <div class="card border-success">
            <div class="card-header text-white bg-success ">
              Acesse sua conta
            </div>
            <div class="card-body">
              <form action="">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="E-mail"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Senha"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div class="row align-items-center">
                <div class="col-sm-6 text-left">
                  <router-link to="/cadastro"
                    >Ainda não sou cadastrado</router-link
                  >
                </div>

                <div class="col-sm-6 text-right">
                  <button class="btn btn-success">Entrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.bg-vegetables {
  position: absolute;
  background: url("../assets/img/veggies.jpg");
  background-size: 8%;
  opacity: 0.2;
}
</style>
