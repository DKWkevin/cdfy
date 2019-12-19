<template>
<div class="slide-verify" id="slideVerify" onselectstart="return false;">
    <canvas :width="w" :height="h" ref="canvas"></canvas>
    <div @click="refresh" class="slide-verify-refresh-icon"></div>
    <canvas :width="w" :height="h" ref="block" class="slide-verify-block"></canvas>
    <!-- container -->
    <div class="slide-verify-slider"
         :class="{'container-active': containerActive, 'container-success': containerSuccess, 'container-fail': containerFail}">
      <div class="slide-verify-slider-mask" :style="{width: sliderMaskWidth}">
        <!-- slider -->
        <div @mousedown="sliderDown"
             @touchstart="touchStartEvent"
             @touchmove="touchMoveEvent"
             @touchend="touchEndEvent"
             class="slide-verify-slider-mask-item"
             :style="{left: sliderLeft}">
          <div class="slide-verify-slider-mask-item-icon"></div>
        </div>
      </div>
      <span class="slide-verify-slider-text">{{sliderText}}</span>
    </div>
  </div>
</template>
<script>
import './slideverify.css'
const PI = Math.PI
function sum (x, y) {
  return x + y
}
function square (x) {
  return x * x
}
export default {
  props: {
    l: {
      type: Number,
      default: 42
    },
    // block radius
    r: {
      type: Number,
      default: 10
    },
    // canvas width
    w: {
      type: Number,
      default: 310
    },
    // canvas height
    h: {
      type: Number,
      default: 155
    },
    sliderText: {
      type: String,
      default: ''
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    }
  },
  data () {
    return {
      containerActive: false, // container active class
      containerSuccess: false, // container success class
      containerFail: false, // container fail class
      canvasCtx: null,
      blockCtx: null,
      block: null,
      block_x: undefined, // container random position
      block_y: undefined,
      L: this.l + this.r * 2 + 3, // block real lenght
      img: '@/assets/images/canvas.png',
      originX: undefined,
      originY: undefined,
      isMouseDown: false,
      trail: [],
      sliderLeft: 0,
      // block right offset
      sliderMaskWidth: 0
      // mask width
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.initDom()
      this.initImg()
      this.bindEvents()
    },
    initDom () {
      this.canvasCtx = this.$refs.canvas.getContext('2d')
      this.block = this.$refs.block
      this.blockCtx = this.block.getContext('2d')
    },
    initImg () {
      const img = this.createImg(() => {
        this.drawBlock()
        this.canvasCtx.drawImage(img, 0, 0, this.w, this.h)
        this.blockCtx.drawImage(img, 0, 0, this.w, this.h)
        let {
          block_x: x,
          block_y: y,
          r,
          L
        } = this
        let _y = y - r * 2 - 1
        let ImageData = this.blockCtx.getImageData(x, _y, L, L)
        this.block.width = L
        this.blockCtx.putImageData(ImageData, 0, _y)
      })
      this.img = img
    },
    drawBlock () {
      this.block_x = 50
      this.block_y = 110
      this.draw(this.canvasCtx, this.block_x, this.block_y, 'fill')
      this.draw(this.blockCtx, this.block_x, this.block_y, 'clip')
    },
    draw (ctx, x, y, operation) {
      let {
        l,
        r
      } = this
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
      ctx.lineTo(x + l, y)
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
      ctx.lineTo(x + l, y + l)
      ctx.lineTo(x, y + l)
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
      ctx.lineTo(x, y)
      ctx.lineWidth = 1
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.stroke()
      ctx[operation]()
      ctx.globalCompositeOperation = 'overlay'
    },
    createImg (onload) {
      const img = document.createElement('img')
      img.crossOrigin = 'Anonymous'
      img.onload = onload
      img.onerror = () => {
        img.src = this.getRandomImg()
      }
      img.src = this.getRandomImg()
      return img
    },
    // 随机生成img src
    getRandomImg () {
      // return 'https://picsum.photos/300/150/?image='
      return require('@/assets/images/974-300x150.jpg')
    },
    /*   getRandomNumberByRange (start, end) {
      console.log(Math.random() * (end - start) / 3)
      console.log(Math.round(Math.random() * (end - start)))
      return Math.round(Math.random() * (end - start) + start)
    }, */
    refresh () {
      this.reset()
      this.$emit('refresh')
    },
    sliderDown (event) {
      this.originX = event.clientX
      this.originY = event.clientY
      this.isMouseDown = true
    },
    touchStartEvent (e) {
      this.originX = e.changedTouches[0].pageX
      this.originY = e.changedTouches[0].pageY
      this.isMouseDown = true
    },
    bindEvents () {
      document.addEventListener('mousemove', (e) => {
        if (!this.isMouseDown) return false
        const moveX = e.clientX - this.originX
        const moveY = e.clientY - this.originY
        if (moveX < 0 || moveX + 38 >= this.w) return false
        this.sliderLeft = moveX + 'px'
        let blockLeft = (this.w - 40 - 20) / (this.w - 40) * moveX
        this.block.style.left = blockLeft + 'px'
        this.containerActive = true
        // add active
        this.sliderMaskWidth = moveX + 'px'
        this.trail.push(moveY)
      })
      document.addEventListener('mouseup', (e) => {
        if (!this.isMouseDown) return false
        this.isMouseDown = false
        if (e.clientX === this.originX) return false
        this.containerActive = false
        // remove active
        const {
          spliced,
          TuringTest
        } = this.verify()
        if (spliced) {
          if (TuringTest) {
            // succ
            this.containerSuccess = true
            this.$emit('success')
          } else {
            this.containerFail = true
            this.sliderText = 'try again'
            this.reset()
          }
        } else {
          this.containerFail = true
          this.$emit('fail')
          setTimeout(() => {
            this.reset()
          }, 1000)
        }
      })
    },
    touchMoveEvent (e) {
      if (!this.isMouseDown) return false
      const moveX = e.changedTouches[0].pageX - this.originX
      const moveY = e.changedTouches[0].pageY - this.originY
      if (moveX < 0 || moveX + 38 >= this.w) return false
      this.sliderLeft = moveX + 'px'
      let blockLeft = (this.w - 40 - 20) / (this.w - 40) * moveX
      this.block.style.left = blockLeft + 'px'
      this.containerActive = true
      this.sliderMaskWidth = moveX + 'px'
      this.trail.push(moveY)
    },
    touchEndEvent (e) {
      if (!this.isMouseDown) return false
      this.isMouseDown = false
      if (e.changedTouches[0].pageX === this.originX) return false
      this.containerActive = false
      const {
        spliced,
        TuringTest
      } = this.verify()
      if (spliced) {
        if (TuringTest) {
          // succ
          this.containerSuccess = true
          this.$emit('success')
        } else {
          this.containerFail = true
          this.sliderText = 'try again'
          this.reset()
        }
      } else {
        this.containerFail = true
        this.$emit('fail')
        setTimeout(() => {
          this.reset()
        }, 1000)
      }
    },
    verify () {
      const arr = this.trail // drag y move distance
      const average = arr.reduce(sum) / arr.length // average
      const deviations = arr.map(x => x - average) // deviation array
      const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // standard deviation
      const left = parseInt(this.block.style.left)
      return {
        spliced: Math.abs(left - this.block_x) < 10,
        TuringTest: average !== stddev
        // equal => not person operate
      }
    },
    reset () {
      this.containerActive = false
      this.containerSuccess = false
      this.containerFail = false
      this.sliderLeft = 0
      this.block.style.left = 0
      this.sliderMaskWidth = 0
      // canvas
      let {
        w,
        h
      } = this
      this.canvasCtx.clearRect(0, 0, w, h)
      this.blockCtx.clearRect(0, 0, w, h)
      this.block.width = w
      // generate img
      this.img.src = this.getRandomImg()
    }
  }
}
</script>
