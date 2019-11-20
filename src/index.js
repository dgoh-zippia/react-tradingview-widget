import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const SCRIPT_ID = 'tradingview-widget-script';
const CONTAINER_ID = 'tradingview-widget';

export default class TradingViewWidget extends PureComponent {
  static propTypes = {
    autosize: PropTypes.bool,
    height: PropTypes.number,
    greyText: PropTypes.string,
    gridLineColor: PropTypes.string,
    fontColor: PropTypes.string,
    underLineColor: PropTypes.string,
    trendLineColor: PropTypes.string,
    symbol: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    locale: PropTypes.string,
    widgetType: PropTypes.string,
    width: PropTypes.number,
    chartOnly: PropTypes.bool,
  };

  static defaultProps = {
    autosize: false,
    height: 400,
    greyText: "Quotes by",
    gridLineColor: "#e9e9ea",
    fontColor: "#83888D",
    underLineColor: "#dbeffb",
    trendLineColor: "#4bafe9",
    locale: 'en',
    widgetType: 'MediumWidget',
    width: 1000,
    chartOnly: false,
  };

  containerId = `${CONTAINER_ID}-${Math.random()}`;

  componentDidMount = () => this.appendScript(this.initWidget);

  componentDidUpdate = () => {
    this.cleanWidget();
    this.initWidget();
  };

  canUseDOM = () => !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

  appendScript = (onload) => {
    if (!this.canUseDOM()) {
      onload();
      return;
    }

    if (this.scriptExists()) {
      /* global TradingView */
      if (typeof TradingView === 'undefined') {
        this.updateOnloadListener(onload);
        return;
      }
      onload();
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/tv.js';
    script.onload = onload;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  getScriptElement = () =>
    document.getElementById(SCRIPT_ID);

  scriptExists = () =>
    this.getScriptElement() !== null;

  updateOnloadListener = (onload) => {
    const script = this.getScriptElement();
    const oldOnload = script.onload;
    return script.onload = () => {
      oldOnload();
      onload();
    };
  };

  initWidget = () => {
    /* global TradingView */
    if (typeof TradingView === 'undefined' || !document.getElementById(this.containerId)) return;

    const { widgetType, ...widgetConfig } = this.props;
    const config = { ...widgetConfig, container_id: this.containerId };

    if (config.autosize) {
      delete config.width;
      delete config.height;
    }

    /* global TradingView */
    new TradingView[widgetType](config);
  };

  cleanWidget = () => {
    if (!this.canUseDOM()) return;
    document.getElementById(this.containerId).innerHTML = '';
  };

  getStyle = () => {
    if (!this.props.autosize) return {};
    return {
      width: '100%',
      height: '100%'
    };
  };

  render = () => <article id={this.containerId} style={this.getStyle()} />
}
