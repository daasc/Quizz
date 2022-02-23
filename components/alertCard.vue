<template>
  <div
    data-testid="alert"
    class="msg"
    :class="{ 'error-msg': !success, 'success-msg': success }"
  >
    <div class="msg__content">
      <span data-testid="msg">{{ msg }}</span>
      <img src="../assets/image/error.svg" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AlertCard',
  props: {
    success: {
      type: Boolean,
      default: false,
    },
    msg: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss">
.msg {
  position: absolute;
  min-width: 300px;
  height: 35px;
  color: white;
  top: 70px;
  right: 10px;
  z-index: 10000;
  padding: 5px 0px 0px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 3px;
  .msg__content {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.error-msg {
  background-color: var(--color-red);
}
.success-msg {
  background-color: var(--color-green);
}
.error-border {
  border-color: var();
}
@keyframes fill-bar {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
