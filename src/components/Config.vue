<template>
  <div id="echo-config">
    <md-card>
      <md-card-header>
        <div class="md-title">请选择您的配置</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100">
            <md-field md-clearable>
              <label>接口地址</label>
              <md-input v-model="config.latestUrl" />
              <span class="md-helper-text">最新版本 solo 的 github restful 接口地址，默认即可</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label>检测时间</label>
              <md-input v-model="config.interval" type="number" />
              <span class="md-suffix">小时</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label>部署方式</label>
              <md-select v-model="config.deploy">
                <md-option value="solo">solo 独立部署</md-option>
                <md-option value="tomcat">tomcat 容器部署</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field md-clearable :class="validateClass(validateVersion)">
              <label>当前版本</label>
              <md-input v-model="config.version" required />
              <span class="md-helper-text echo-tip">当前已经部署的版本号</span>
              <span class="md-error echo-tip">必填项且必须以 v 开头</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field md-clearable :class="validateClass(validateHomeDir)">
              <label>文件夹路径</label>
              <md-input v-model="config.homeDir" required />
              <span class="md-helper-text echo-tip">下载的 war 包解压后存放路径，tomcat 请输入 webapps 路径</span>
              <span class="md-error echo-tip">必填项，如果 tomcat 部署方式请输入 webapps 路径</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-chips class="md-primary" v-model="config.otherFiles" md-placeholder="其他文件">
              <div class="md-helper-text echo-tip">随着更新一起复制的文件相对路径，回车键添加，例如皮肤图片：skins/Finding/images/header-bg.jpg</div>
            </md-chips>
          </div>
          <div v-if="config.deploy === 'tomcat'" class="md-layout-item md-size-100" >
            <md-field md-clearable>
              <label>文件夹名称</label>
              <md-input v-model="config.tomcatDir" />
              <span class="md-helper-text echo-tip">部署在 webapps 目录下的 solo 的文件夹名称</span>
            </md-field>
          </div>
          <div v-else class="md-layout-item md-size-100" :class="validateClass(validateStartCommand)">
            <md-field md-clearable>
              <label>启动命令</label>
              <md-input v-model="config.startCommand" required/>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-switch v-model="config.debug">Debug 模式：开启后，启动时日志会记录最终读取到的配置信息</md-switch>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-accent" @click="handleReset">重置</md-button>
        <md-button class="md-raised md-primary" @click="handleOk">生成</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Config extends Vue {
  defaultConfig: Object = {
    latestUrl: 'https://api.github.com/repos/b3log/solo/releases/latest',
    deploy: 'solo',
    interval: 1,
    version: 'v3.2.0',
    homeDir: '/root/',
    tomcatDir: 'solo',
    startCommand: ';nohup java -cp WEB-INF/lib/*:WEB-INF/classes org.b3log.solo.Starter >/dev/null 2>&1 &',
    debug: false,
    otherFiles: []
  }
  config: Object = JSON.parse(JSON.stringify(this.defaultConfig))
  validateVersion: Boolean = false
  validateHomeDir: Boolean = false
  validateStartCommand: Boolean = false

  validateClass (status): Object {
    return {
      'md-invalid': status
    }
  }

  mounted (): void {
    this.handleOk()
  }

  @Watch('config', { deep: true })
  watchConfig (): void {
    if (this.config['deploy'] === 'solo') {
      this.config['startCommand'] = this.defaultConfig['startCommand']
      this.validateHomeDir = this.config['homeDir'].includes('webapps')
      delete this.config['tomcatDir']
    } else {
      this.config['tomcatDir'] = this.defaultConfig['tomcatDir']
      this.validateHomeDir = !this.config['homeDir'].includes('webapps')
      delete this.config['startCommand']
    }
    this.validateVersion = !this.config['version'].startsWith('v')
    this.handleOk()
  }

  handleOk (): void {
    this.$emit('on-config', this.config)
  }

  handleReset (): void {
    this.config = JSON.parse(JSON.stringify(this.defaultConfig))
  }
}

</script>

<style lang="less" scoped>

</style>
