<template lang="html">
      <div id="minepassword">
      <mt-popup
  v-model="popupVisible"
  position="bottom">
  ...
</mt-popup>
</div>
</template>
<script>
  import { Popup } from 'mint-ui';

  export default {
     data(){
       return {
         popupVisible:true
       }
     }
}
</script>

<style lang="css">

</style>
