<template>
  <div id="echo-result">
    <md-card>
      <md-card-header>
        <div class="md-title">最终配置</div>
      </md-card-header>
      <md-card-content>
      <pre>{{ JSON.stringify(config, null, 1) }}</pre>
      <md-content class="md-primary">
        前台运行，假设配置文件与 jar 包位于同一目录且名称为 solo-auto.json (点击命令复制)
        <md-content class="md-accent"
                    v-clipboard:copy="command1"
                    v-clipboard:success="handleSuccess"
                    v-clipboard:error="handleError">
          {{command1}}
        </md-content>
        后台运行，假设配置文件与 jar 包位于同一目录且名称为 solo-auto.json (点击命令复制)
        <md-content class="md-accent"
                    v-clipboard:copy="command2"
                    v-clipboard:success="handleSuccess"
                    v-clipboard:error="handleError">
          {{command2}}
        </md-content>
      </md-content>

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
  command1: String = 'java -jar soloauto-1.0.0-SNAPSHOT-fat.jar -conf solo-auto.json'
  command2: String = 'nohup java -jar soloauto-1.0.0-SNAPSHOT-fat.jar -conf solo-auto.json >/dev/null 2>&1 &'

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
.md-content.md-primary{
  padding: 1rem;
}

.md-content.md-accent{
  padding: 0.5rem;
}
</style>
