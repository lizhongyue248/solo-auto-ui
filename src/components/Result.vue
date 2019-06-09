<template>
  <div id="echo-result">
    <md-card>
      <md-card-header>
        <div class="md-title">最终配置</div>
      </md-card-header>
      <md-card-content>
      <pre>{{ JSON.stringify(config, null, 1) }}</pre>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-primary"
                   v-clipboard:copy="JSON.stringify(config, null, 1)"
                   v-clipboard:success="handleSuccess"
                   v-clipboard:error="handleError"
        >复制</md-button>
      </md-card-actions>
    </md-card>
    <md-snackbar  md-position="center" :md-active.sync="showSnackbar" md-persistent>
      <span>{{ message }}</span>
      <md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Result extends Vue {
  @Prop() private config!: Object
  message: String = ''
  showSnackbar: Boolean = false

  handleSuccess (): void {
    this.message = '复制成功'
    this.showSnackbar = true
  }

  handleError (): void {
    this.message = '复制失败'
    this.showSnackbar = true
  }
}

</script>

<style lang="less" scoped>
pre {
  white-space:pre-wrap; /* css3.0 */
  white-space:-moz-pre-wrap; /* Firefox */
  white-space:-o-pre-wrap; /* Opera 7 */
  word-wrap:break-word; /* Internet Explorer 5.5+ */
}
</style>
