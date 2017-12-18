<template>
  <div class="category">
       <h1>login</h1>
       <footerbottom></footerbottom>
  </div>
</template>

<script>
  import footerbottom from "@/components/common/footerbottom";
  export default {
    name: 'login',
    components:{
      footerbottom
    },
    created(){
      localMessage.set("userid","002");
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
