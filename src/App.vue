<template>
  <div>
    <div id="app">
      <router-view/>
    </div>
  </div>

</template>

<script>
	import home from '@/components/pages/home'
	import Vue from 'vue'
	import axios from 'axios'

	export default {
		name: 'app',
		data() {
			return {
			}
		},
		components: {
			home
		},
		methods: {

		}

	}
</script>

<style>
</style>
