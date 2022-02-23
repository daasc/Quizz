<template>
  <div
    data-testid="alert"
    class="msg"
    :class="{ 'error-msg': !success, 'success-msg': success }"
  >
    <div class="msg__content">
      <span data-testid="msg">{{ msg }}</span>
      <img src="../assets/image/checked.svg" alt="" />
    </div>
    <div class="msg__progress">
      <div class="progress__bar"></div>
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
  min-width: 250px;
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
  .msg__progress {
    width: 97%;
    height: 5px;
    border: 1px solid #155e23;
    border-radius: 8px;
    .progress__bar {
      background-color: #155e23;
      width: 0%;
      height: 5px;
      animation: fill-bar 3s infinite;
    }
  }
}
.error-msg {
  background-color: red;
}
.success-msg {
  background-color: green;
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
