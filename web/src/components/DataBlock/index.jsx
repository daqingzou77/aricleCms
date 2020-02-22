/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import CountUp from 'react-countup';
import style from './style.less';

export default class DataBlock extends Component {
    static propTypes = {
        color: PropTypes.string,
        icon: PropTypes.string,
        count: PropTypes.number,
        tip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    };

    render() {
        const {
            iconBgColor,
            color,
            color2,
            icon,
            count,
            tip,
        } = this.props;

        // const blockStyle = {
        //     border: `1px solid ${color}`,
        // };

        const blockStyle = {
            background: `linear-gradient(to left,${color},${color2})`,
        };

        const iconStyle = {
            background: iconBgColor,
        };

        return (
            // eslint-disable-next-line react/jsx-filename-extension
          <div className={style.dataBlockRoot} style={blockStyle}>
            <div className={style.bgimg}>
              <div className={style.icon} style={iconStyle}>
                <Icon type={icon} />
              </div>
              <div className={style.message}>
                <div className={style.count}>
                  <CountUp end={count} />
                </div>
                <div className={style.tip}>{tip}</div>
              </div>
            </div>
          </div>
        );
    }
}
