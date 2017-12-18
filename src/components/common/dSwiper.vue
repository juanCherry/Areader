<template>
  <div class="bswiper">
    <mt-swipe :auto="3000">
  		<mt-swipe-item><img src="http://oz033lzfm.bkt.clouddn.com/book.jpg"></mt-swipe-item>
  		<mt-swipe-item><img src="http://oz033lzfm.bkt.clouddn.com/book1.jpg"></mt-swipe-item>
  		<mt-swipe-item><img src="http://oz033lzfm.bkt.clouddn.com/book2.jpg"></mt-swipe-item>
	  </mt-swipe>
  </div>
</template>

<script>
  export default {

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bswiper{
    margin: 0;
    padding: 0;
    height: 3.5rem;
    width: 100%;
    margin-top: 40px;

    background: skyblue;
  }
  .bswiper img{
    width: 100%;
    height: 100%;
  }
  /*.mint-swipe-indicator.is-active{
    background: blue;
  }*/

</style>
