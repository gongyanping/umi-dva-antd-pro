import React, { Component } from 'react'
import withRouter from 'umi/withRouter'
import { DatePicker, Button, ConfigProvider } from 'antd'
import { I18nProvider, Trans } from '@lingui/react'
// import { langFromPath, defaultLanguage } from 'utils'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

// import BaseLayout from './BaseLayout'

const languages = {
  zh: zh_CN,
  en: en_US
}

@withRouter
class Layout extends Component {
  state = {
    catalogs: {},
  }

  // language = defaultLanguage

  componentDidMount() {
    //const language = langFromPath(this.props.location.pathname)
    let language = 'zh'
    language && this.loadCatalog(language)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const language = langFromPath(nextProps.location.pathname)
  //   const preLanguage = this.language
  //   const { catalogs } = nextState

  //   if (preLanguage !== language && !catalogs[language]) {
  //     language && this.loadCatalog(language)
  //     this.language = language
  //     return false
  //   }
  //   this.language = language

  //   return true
  // }

  loadCatalog = async language => {
    const catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `@lingui/loader!../locales/${language}/messages.json`
    )

    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: catalog,
      },
    }), () => {
      console.log(this.state.catalogs)
    })
  }

  render() {
    const { location, children } = this.props
    const { catalogs } = this.state
    console.log(catalogs)
    let language = 'zh';
    // let language = langFromPath(location.pathname)
    // If the language pack is not loaded or is loading, use the default language
    // if (!catalogs[language]) language = defaultLanguage

    return (
      <ConfigProvider locale={zh_CN}>
        <I18nProvider language='zh' catalogs={catalogs}>
          {/* <BaseLayout>{children}</BaseLayout> */}
          <DatePicker />
          <Button
            type="primary"
          >
            <Trans>Params</Trans>
          </Button>
          {children}
        </I18nProvider>
      </ConfigProvider>
    )
  }
}

export default Layout
