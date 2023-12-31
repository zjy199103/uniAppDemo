<template>
  <svg version="1.1"
    :class="klass"
    :role="label ? 'img' : 'presentation'"
    :aria-label="label"
    :viewBox="box"
     v-if="icon && !backgroundImage"
    :style="cssStyle">
      <template v-if="!backgroundImage && icon && icon.raw">
        <g v-html="raw" v-bind="icon.g"></g>
      </template>
      <template v-else-if="!backgroundImage && icon && icon.paths.length > 0">
        <path v-for="(path, i) in icon.paths" :key="`path-${i}`" v-bind="path"/>
      </template>
      <template v-else-if="!backgroundImage && icon && icon.polygons.length > 0">
        <polygon v-for="(polygon, i) in icon.polygons" :key="`polygon-${i}`" v-bind="polygon"/>
      </template>
  </svg>
	
	  <image
			:src="svgData"
			mode="widthFix"
			v-else
			:style="cssStyle"
		></image>
</template>

<style>
.fa-icon {
  display: inline-block;
  fill: currentColor;
}

.fa-flip-h {
  transform: scale(-1, 1);
}

.fa-flip-v {
  transform: scale(1, -1);
}

.fa-flip-vh {
  transform: scale(-1, -1);
}

.fa-spin {
  animation: fa-spin 0.5s 0s infinite linear;
}

.fa-pulse {
  animation: fa-spin 1s infinite steps(8);
}

@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
let icons = {}
function svgToDataUrl(svgContent) {
  const encodedSvgContent = encodeURIComponent(svgContent);
  const dataUrl = `data:image/svg+xml;utf8,${encodedSvgContent}`;
  return dataUrl;
}

export default {
  name: 'fa-icon',
  props: {
    name: {
      type: String,
      default: ''
    },
    content: [String, Promise],
    width: {
      type: [Number, String],
      default: undefined
    },
    height: {
      type: [Number, String],
      default: undefined
    },
    spin: Boolean,
    pulse: Boolean,
    flip: {
      validator (val) {
        return val === 'h' || val === 'v' || val === 'vh'
      }
    },
    label: String,
    backgroundImage: {
      type: Boolean,
      default: true,
    },
    color: String
  },
  data () {
    return {
      iconHash: '',
			svgData:','
    }
  },
  watch: {
    content: {
      handler (nv) {
        if (nv) {
          if (typeof nv === 'string') {
            this.initFromContent(nv)
          } else {
            nv.then(res => {
              this.initFromContent(res.default)
            })
          }
        }
      },
      immediate: true
    }
  },
  created () {
  },
  methods: {
    hashCode (str) {
      str = str.toLowerCase()
      let hash = 1315423911
      let i
      let ch
      for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i)
        hash ^= ((hash << 5) + ch + (hash >> 2))
      }
      return (hash & 0x7FFFFFFF)
    },
    initFromContent (nv) {
      let hash = this.hashCode(nv)
      this.iconHash = hash
      if (!icons[hash]) {
        let content = nv
        let viewBoxReg = new RegExp('viewBox="(.*?) (.*?) (.*?) (.*?)"')
        let viewBox = content.match(viewBoxReg)
        if (!viewBox || viewBox.length < 5) {
          return
        }
        let x = viewBox[1]
        let y = viewBox[2]
        let width = viewBox[3]
        let height = viewBox[4]
        let rawReg = new RegExp('<svg.*?>(.*?)</svg>')
        let raw = content.match(rawReg)[1]
        icons[hash] = {
          x: x,
          y: y,
          width: width,
          height: height,
          raw: raw
        }
      }
    },
    fixSize (val) {
      let res = val
      if (typeof res === 'number') {
        res += 'px'
      } else if (typeof res === 'string') {
        if (res.indexOf('px') < 0 && res.indexOf('em') < 0 && res.indexOf('%') < 0) {
          res += 'px'
        }
      }
      return res
    }
  },
  computed: {
    klass () {
      return {
        'fa-icon': true,
        'fa-spin': this.spin,
        'fa-flip-h': this.flip === 'h',
        'fa-flip-v': this.flip === 'v',
        'fa-flip-vh': this.flip === 'vh',
        'fa-pulse': this.pulse,
        [this.$options.name]: true
      }
    },
    icon () {
      if (this.name || this.iconHash) {
        return icons[this.name] || icons[this.iconHash]
      }
      return null
    },
    box () {
      if (this.icon) {
        return `${this.icon.x || 0} ${this.icon.y || 0} ${this.icon.width} ${this.icon.height}`
      }
      return `0 0 1024 1024`
    },
    cssStyle () {
      let width = this.fixSize(this.icon.width)
      let height = this.fixSize(this.icon.height)
      if (this.backgroundImage) {
        let content = ''
        if (this.icon && this.icon.paths) {
          for (let path of this.icon.paths) {
            let str = ''
            for (let k in path) {
              str += `${k}='${path[k]}' `
            }
            content += `<path ${str.trim()}/>`
          }
        }
        if (this.icon && this.icon.polygons) {
          for (let path of this.icon.polygons) {
            let str = ''
            for (let k in path) {
              str += `${k}='${path[k]}' `
            }
            content += `<polygon ${str.trim()}/>`
          }
        }
        if (this.icon && this.icon.raw) {
          let str = ''
          for (let k in this.icon.g) {
            str += `${k}='${this.icon.g[k]}' `
          }
          content += `<g ${str.trim()}>${this.raw.replace(/"/g, '\'')}</g>`
        }
        let code = {
          '%': '%25',
          '!': '%21',
          '@': '%40',
          '&': '%26',
          '#': '%23'
        }
        let svg = `<svg viewBox='${this.box}' fill='${this.color}' version='1.1' xmlns='http://www.w3.org/2000/svg'>${content}</svg>`
        for (let k in code) {
          svg = svg.replace(new RegExp(k, 'g'), code[k])
        }
				this.svgData = svgToDataUrl(this.icon.raw)
				console.log(this.svgData)
        let css = {
          // 'background-image': `url("data:image/svg+xml,${svg}")`,
          width: width,
          height: height
        }
        return css
      }
      return { color: this.color, width: width, height: height }
    },
    raw () {
      // generate unique id for each icon's SVG element with ID
      if (!this.icon || !this.icon.raw) {
        return null
      }
      let raw = this.icon.raw
      let ids = {}
      raw = raw.replace(/\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g, (match, quote, id) => {
        let uniqueId = getId()
        ids[id] = uniqueId
        return ` id="${uniqueId}"`
      })
      raw = raw.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, (match, rawId, _, pointerId) => {
        let id = rawId || pointerId
        if (!id || !ids[id]) {
          return match
        }

        return `#${ids[id]}`
      })

      return raw
    }
  },
  mounted () {},
  register (data) {
    for (let name in data) {
      let icon = data[name]

      if (!icon.paths) {
        icon.paths = []
      }
      if (icon.d) {
        icon.paths.push({ d: icon.d })
      }

      if (!icon.polygons) {
        icon.polygons = []
      }
      if (icon.points) {
        icon.polygons.push({ points: icon.points })
      }

      icons[name] = icon
    }
  },
  icons
}

let cursor = 0xd4937
function getId () {
  return `fa-${(cursor++).toString(16)}`
}
</script>