import { message } from 'ant-design-vue/es'
// import defaultSettings from '../defaultSettings';

let lessNodesAppended

const colorList = [
  {
    key: '薄暮', color: '#F5222D'
  },
  {
    key: '火山', color: '#FA541C'
  },
  {
    key: '日暮', color: '#FAAD14'
  },
  {
    key: '明青', color: '#13C2C2'
  },
  {
    key: '极光绿', color: '#52C41A'
  },
  {
    key: '拂晓蓝（默认）', color: '#1890FF'
  },
  {
    key: '极客蓝', color: '#2F54EB'
  },
  {
    key: '酱紫', color: '#722ED1'
  },
  {
    key: '酱紫', color: 'pink'
  }
]
const updateTheme = (primaryColor, fSize) => {
  console.log('fSize', fSize)
  console.log('primaryColor', primaryColor)
  // Don't compile less in production!
  /* if (process.env.NODE_ENV === 'production') {
    return;
  } */
  // Determine if the component is remounted
  if (!primaryColor) {
    return
  }
  const hideMessage = message.loading('正在编译主题！', 0)
  function buildIt() {
    // 正确的判定less是否已经加载less.modifyVars可用
    if (!window.less || !window.less.modifyVars) {
      return
    }
    // less.modifyVars可用
    window.less.modifyVars({
      '@primary-color': primaryColor,
      '@link-color': primaryColor,
      '@font-size-base': fSize + 'px'
    })
    .then((res) => {
      console.log('setting', res)
      hideMessage()
    })
    .catch((e) => {
      console.log('setting catch', e)
      message.error('Failed to update theme')
      hideMessage()
    })
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link')
    const lessStyleNode2 = document.createElement('link')
    const lessStyleNode4 = document.createElement('link')

    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')

    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode2.setAttribute('rel', 'stylesheet/less')
    lessStyleNode4.setAttribute('rel', 'stylesheet/less')

    lessStyleNode.setAttribute('href', '/css/componentTheme.less')
    lessStyleNode2.setAttribute('href', '/css/componentFontSize.less')
    // lessStyleNode4.setAttribute('href', '/ant-design-vue/dist/antd.less')
    lessStyleNode4.setAttribute('href', '/css/color.less')

    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode4)
    document.body.appendChild(lessStyleNode2)
    document.body.appendChild(lessStyleNode)

    document.body.appendChild(lessScriptNode)
    document.body.appendChild(lessConfigNode)
    lessNodesAppended = true
  } else {
    buildIt()
  }
}

export { updateTheme, colorList }