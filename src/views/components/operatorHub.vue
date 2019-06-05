<template>
<div>
    <Button @click="value2 = true" type="primary">Open</Button>
    <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="value2">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer>
</div>
</template>

<style scoped>

</style>

<script>
  export default {
    data: function () {
      return {
      }
    },
    components: {
    }
  }
</script>
