module.exports = (api, options, rootOptions) => {

  api.extendPackage({
    dependencies: {
      "ant-design-vue": '^1.7.3',
      "axios":'^0.21.0',
      "lodash.get": "^4.4.2",
      "lodash.pick": "^4.4.0",
      "qs": "^6.9.4",
      "vue-ls": "^3.2.2",
    }
  })

  api.render('./template')
}