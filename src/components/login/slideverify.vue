<template>
<div class="puzzle-container">
  <div class="puzzle-header">
    <span class="puzzle-header-left">拖动滑块以完成验证</span>
    <div>
      <span class="el-icon-refresh-right"></span>
    </div>
  </div>
  <div style="position:relative;overflow: hidden" :style="{width: dataWidth + 'px'}">
    <div style="position:relative" :style="{width: dataWidth + 'px',height: dataHeight+'px'}">
      <img id="scream" :style="{width: dataWidth + 'px',height: dataHeight+'px'}" :src="imgRandom">
      <canvas class="puzzle-box" ref="puzzleBox" :width="dataWidth" :height="dataHeight"></canvas>
    </div>
    <div class="puzzle-lost-box" :style="{width: dataWidth + 'px',height: dataHeight+'px'}">
      <canvas class="puzzle-shadow" ref="puzzleShadow" :width="dataWidth" :height="dataHeight"></canvas>
      <canvas class="puzzle-lost" ref="puzzleLost" :width="dataWidth" :height="dataHeight"></canvas>
    </div>
    <p>
      <template>
        <i></i>
        <span></span>
        <span></span>
      </template>
      <template>
        <i></i>
        <span></span>
        <span></span>
      </template>
    </p>
  </div>
  <div class="slider-container" :style="{width: dataWidth + 'px'}">
    <div class="slider-bar"></div>
    <div class="slider-btn"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'slideverify',
  props: {
    width: {
      type: Number,
      default: 260
    },
    height: {
      type: Number,
      default: 120
    },
    blockRadius: {
      type: Number,
      default: 4
    },
    borderSize: {
      type: Number,
      default: 40
    },
    wrapperPadding: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      moveStart: null,
      dataWidth: null,
      dataHeight: null,
      puzzleSize: null,
      padding: null,
      randomX: null,
      randomY: null,
      leftNum: null,
      radius: null,
      imgRandom: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  created () {
    this.imgRandom = require('../../assets/images/974-300x150.jpg')
    this.dataWidth = Number(this.width)
    this.dataHeight = Number(this.height)
    this.radius = Number(this.blockRadius)
    this.puzzleSize = Number(this.borderSize)
    this.padding = Number(this.wrapperPadding)
  },
  methods: {
    init () {
      this.clearCanvas()
      let w = this.dataWidth
      let h = this.dataHeight
      let plSize = this.puzzleSize
      console.log(this.puzzleSize)
      let padding = this.padding
      let minNX = padding + plSize
      let minNY = h - padding - plSize - plSize / 6
      let maxNX = w - padding - plSize - plSize / 6
      let maxNY = padding
      this.randomX = Math.round(Math.random() * (maxNX - plSize) + minNX)
      this.randomY = Math.round(Math.random() * maxNY + minNY)
      let X = this.randomX
      console.log(X)
      let Y = this.randomY
      console.log(Y)
      this.leftNum = -X + 10
      let d = plSize / 3
      let radius = Number(this.radius)
      console.log(radius)
      let c = this.$refs.puzzleBox
      let cl = this.$refs.puzzleLost
      let cs = this.$refs.puzzleShadow
      let ctx = c.getContext('2d')
      let ctxl = cl.getContext('2d')
      let ctxs = cs.getContext('2d')
      ctx.globalCompositeOperation = 'xor'
      ctx.shadowBlur = 10
      ctx.shadowColor = '#fff'
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3
      ctx.fillStyle = 'rgba(0,0,0,0.7)'
      ctx.beginPath()
      ctx.lineWidth = '1'
      ctx.strokeStyle = 'rgba(0,0,0,0)'
      /* ctx.arc(X + radius, Y + radius, radius, Math.PI, (Math.PI * 3) / 2) // x,y,r,start,end
      ctx.lineTo(plSize - radius + X, Y)
      ctx.arc(plSize - radius + X, radius + Y, radius, (Math.PI * 3) / 2, Math.PI * 2) // x,y,r,start,end
      ctx.lineTo(plSize + X, plSize + Y - radius)
      ctx.arc(plSize - radius + X, plSize - radius + Y, radius, 0, (Math.PI * 1) / 2)
      ctx.lineTo(radius + X, plSize + Y)
      ctx.arc(radius + X, plSize - radius + Y, radius, (Math.PI * 1) / 2, Math.PI) */
      ctx.moveTo(X, Y)
      ctx.lineTo(X + d, Y)
      ctx.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
      ctx.lineTo(X + 3 * d, Y)
      ctx.lineTo(X + 3 * d, Y + d)
      ctx.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d)
      ctx.lineTo(X + 3 * d, Y + 3 * d)
      ctx.lineTo(X, Y + 3 * d)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
      let img = new Image()
      img.src = this.imgRandom
      img.onload = function () {
        ctxl.drawImage(img, 0, 0, w, h)
      }
      ctxl.beginPath()
      ctxl.strokeStyle = 'rgba(0, 0, 0, 0)'
      ctxl.moveTo(X, Y)
      ctxl.lineTo(X + d, Y)
      ctxl.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
      ctxl.lineTo(X + 3 * d, Y)
      ctxl.lineTo(X + 3 * d, Y + d)
      ctxl.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d)
      ctxl.lineTo(X + 3 * d, Y + 3 * d)
      ctxl.lineTo(X, Y + 3 * d)
      ctxl.closePath()
      ctxl.stroke()
      ctxl.shadowBlur = 10
      ctxl.shadowColor = 'black'
      ctxl.clip()
      ctxs.beginPath()
      ctxs.lineWidth = '1'
      ctxs.strokeStyle = 'rgba(0, 0, 0, 0)'
      ctxs.moveTo(X, Y)
      ctxs.lineTo(X + d, Y)
      ctxs.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
      ctxs.lineTo(X + 3 * d, Y)
      ctxs.lineTo(X + 3 * d, Y + d)
      ctxs.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d)
      ctxs.lineTo(X + 3 * d, Y + 3 * d)
      ctxs.lineTo(X, Y + 3 * d)
      ctxs.closePath()
      ctxs.stroke()
      ctxs.shadowBlur = 20
      ctxs.shadowColor = 'black'
      ctxs.fill()
    },
    clearCanvas () {
      let c = this.$refs.puzzleBox
      let cl = this.$refs.puzzleLost
      let cs = this.$refs.puzzleShadow
      c.setAttribute('height', c.getAttribute('height'))
      cl.setAttribute('height', cl.getAttribute('height'))
      cs.setAttribute('height', cs.getAttribute('height'))
    }
  }
}
</script>

<style>
  .puzzle-container{
    position: relative;
    display: inline-block;
    padding:15px 15px 28px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 6px;
  }
  .puzzle-header{
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }
  .puzzle-header-left{
    color:#333;
  }
  .puzzle-box{
    position:absolute;
    left:0;
    top: 0;
    z-index: 22;
  }
  .puzzle-lost-box{
    position: absolute;
    width:260px;
    height:116px;
    left:0;
    top:0;
    z-index:111;
  }
  .puzzle-shadow{
    position: absolute;
    top:0;
    left:0;
    z-index:22;
  }
  .puzzle-lost{
    position: absolute;
    top:0;
    left:0;
    z-index:33;
  }
  .slider-container{
    position: relative;
    margin:10px auto 0;
    min-height:15px;
  }
  .slider-bar{
    height:10px;
    border:1px solid #c3c3c3;
    border-radius: 5px;
    background:#e4e4e4;
    box-shadow:0 1px 1px rgba(12,10,10,0.2) inset;
    position: absolute;
    width:100%;
    top:7px;
  }
  .slider-btn{
    position: absolute;
    width:44px;
    height:44px;
    left:0;
    top:-7px;
    z-index: 12;
    cursor: pointer;
    transition: inherit;
  }
</style>
