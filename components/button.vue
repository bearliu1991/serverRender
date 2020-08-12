<template>
  <button></button>
</template>

<style lang="stylus">
button {
  position: relative;
  width: 400px;
  height: 45px;
  background-color: transparent;
  color: #fff;
  border: 1px solid transparent;
  border-color: #000;
  outline: none;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: initial;
  transition: color 0.45s cubic-bezier(0.785,0.135,0.15,0.86),border 0.45s cubic-bezier(0.785,0.135,0.15,0.86);
}

button:hover {
  background: transparent;
  color: #000;
  border: 1px solid #000;
  }

button::before{
  position: absolute;
  content: '';
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  transform: scale(1,1);
  transform-origin: left center;
  z-index: -1;
  background-color: #000;
  transition: transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),-webkit-transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
button:hover::before {
  transform-origin: right center;
  transform: scale(0, 1);
}
</style>