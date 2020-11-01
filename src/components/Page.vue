<template>
  <div class="h-100 pb-5 bg-light">
    <header-navbar></header-navbar>
   
    <div class="container-fluid mt-4">
        <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import HeaderNavbar from '@/components/HeaderNavbar'
export default {
  components: {
    HeaderNavbar
  }
}
</script>