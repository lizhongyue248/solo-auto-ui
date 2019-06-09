<template>
  <div class="echo-full">
    <md-toolbar class="md-dense">
      <div class="md-display-1">
        Solo-auto
        <a class="md-subheading echo-pointer" href="https://echocow.cn" target="_blank">EchoCow</a>
      </div>
    </md-toolbar>

    <div class="md-layout md-alignment-top-center md-gutter">
      <div class="md-layout-item md-size-35 md-medium-size-50 md-small-size-50 md-xsmall-size-100" id="echo-left">
        <Config @on-config="handleConfig"/>
      </div>
      <div class="md-layout-item md-size-35 md-medium-size-50 md-small-size-50 md-xsmall-size-100" id="echo-right">
        <Result :config="config"/>
      </div>
    </div>
    <div class="echo-text-center" id="echo-footer">
      <p> © 2017-2019 <a href="https://github.com/lizhongyue248" target="_blank">EchoCow</a>
        黔ICP备17008630号
      </p>
      <a href="https://github.com/lizhongyue248" target="_blank">
        <img src="./assets/github.png" alt="github"/>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Config from './components/Config.vue'
import Result from './components/Result.vue'

@Component({
  components: {
    Config,
    Result
  }
})
export default class App extends Vue {
    config: Object = {}

    handleConfig (config: Object): void {
      this.config = config
    }
}
</script>

<style lang="less">
  body, .echo-full {
    height: 100%;
  }

  .echo-text-center {
    text-align: center;
  }

  .echo-pointer {
    cursor: pointer;
  }

  #echo-left, #echo-right {
  }

  #echo-title {
    padding: 2rem;
  }

  .echo-tip {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
  }

  #echo-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
