/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-void */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    InputNumber,
    Input,
    Select,
    TreeSelect,
    Checkbox,
    Radio,
    Switch,
    DatePicker,
    TimePicker,
    Cascader,
    Icon,
    Tooltip,
    Transfer,
} from 'antd';
import styles from './style.less';

const { TextArea, Password } = Input;
const FormItem = Form.Item;

// input hidden number textarea password mobile email select select-tree checkbox checkbox-group radio radio-group switch date time date-time date-range cascader

/**
 * 类似 input 元素
 * @param type
 * @returns {boolean}
 */
export function isInputLikeElement(type) {
    return [
        'input',
        'hidden',
        'number',
        'textarea',
        'password',
        'mobile',
        'email',
        'json',
    ].includes(type);
}

function getElement(item) {
    const { type = 'input', component, ...props } = item;

    const commonProps = {
        size: 'default',
    };
    // 样式
    // const width = props.width || '100%';
    // const elementCommonStyle = {width};
    // props.style = props.style ? {...elementCommonStyle, ...props.style} : elementCommonStyle;

    // 如果 component 存在，说明是自定义组件
    if (component) {
        return typeof component === 'function' ? component() : component;
    }

    if (isInputLikeElement(type)) {
        if (type === 'number') return <InputNumber {...commonProps} {...props} />;
        if (type === 'textarea') return <TextArea {...commonProps} {...props} />;
        if (type === 'password') return <Password {...commonProps} {...props} />;
        return <Input {...commonProps} type={type} {...props} />;
    }

    if (type === 'select') {
        const { options = [], ...others } = props;
        return (
          <Select {...commonProps} {...others}>
            {
              options.map(opt => <Select.Option key={opt.value} {...opt}>{opt.label}</Select.Option>)
            }
          </Select>
        );
    }
    
    if (type === 'select-tree') return <TreeSelect {...commonProps} {...props} treeData={props.options} />;
    if (type === 'checkbox') return <Checkbox {...commonProps} {...props}>{props.label}</Checkbox>;
    if (type === 'checkbox-group') return <Checkbox.Group {...commonProps} {...props} />;
    if (type === 'radio') return <Radio {...commonProps} {...props}>{props.label}</Radio>;
    if (type === 'radio-group') return <Radio.Group {...commonProps} {...props} />;
    if (type === 'radio-button') {
        const { options = [], ...others } = props;
        return (
          <Radio.Group buttonStyle="solid" {...commonProps} {...others}>
            {options.map(opt => <Radio.Button key={opt.value} {...opt}>{opt.label}</Radio.Button>)}
          </Radio.Group>
        );
    }

    if (type === 'cascader') return <Cascader {...commonProps} {...props} />;

    if (type === 'switch') return <Switch {...commonProps} {...props} style={{ ...props.style, width: 'auto' }} />;

    if (type === 'date') return <DatePicker {...commonProps} {...props} />;

    if (type === 'date-time') return <DatePicker {...commonProps} showTime {...props} />;

    if (type === 'date-range') return <DatePicker.RangePicker {...commonProps} {...props} />;

    if (type === 'month') return <DatePicker.MonthPicker {...commonProps} {...props} />;

    if (type === 'time') return <TimePicker {...commonProps} {...props} />;

    if (type === 'transfer') return <Transfer {...commonProps} {...props} />;

    throw new Error(`no such type: ${type}`);
}

class FormElement extends Component {
    static propTypes = {
        // 自定义属性
        form: PropTypes.object,
        type: PropTypes.string.isRequired,
        labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        labelTip: PropTypes.any,
        tip: PropTypes.any,
        field: PropTypes.string,
        decorator: PropTypes.object,
        style: PropTypes.object,
        elementStyle: PropTypes.object,
        layout: PropTypes.bool,

        // Form.Item属性
        colon: PropTypes.any,
        extra: PropTypes.any,
        hasFeedback: PropTypes.any,
        help: PropTypes.any,
        label: PropTypes.any,
        labelCol: PropTypes.any,
        required: PropTypes.any,
        validateStatus: PropTypes.any,
        wrapperCol: PropTypes.any,

        // decorator属性 展开方便使用
        getValueFromEvent: PropTypes.any,
        initialValue: PropTypes.any,
        normalize: PropTypes.any,
        preserve: PropTypes.any,
        rules: PropTypes.any,
        trigger: PropTypes.any,
        validateFirst: PropTypes.any,
        validateTrigger: PropTypes.any,
        valuePropName: PropTypes.any,
    };

    static defaultProps = {
        // eslint-disable-next-line react/default-props-match-prop-types
        type: 'input',
        style: {},
        elementStyle: {},
        layout: false,
    };

    componentDidMount() {
        this.setStyle();
        const { layout, field, form } = this.props;
        if (!layout && !form) {
            console.error('warning: FormElement 缺少form属性');
        }

        if (!layout && !field) {
            console.error('warning: FormElement 缺少Field属性');
        }
    }

    componentDidUpdate() {
        this.setStyle();
    }

    setStyle = () => {
        let { labelWidth } = this.props;
        const { label, labelBlock } = this.props;
        const labelDom = this.container.querySelector('.ant-form-item-label');

        if (!label) labelWidth = 0;

        if (labelDom) {
            if (labelWidth !== void 0) {
                const width = typeof labelWidth === 'string' ? labelWidth : `${labelWidth}px`;

                if (labelBlock) {
                    labelDom.style.width = width;
                } else {
                    labelDom.style.flexBasis = width;
                }
            } else {
                labelDom.style.paddingLeft = '0';
            }
        }

        // label自己独占一行
        if (labelBlock) {
            const formItemDom = this.container.querySelector('.ant-form-item');
            formItemDom.style.flexDirection = 'column';
        }
    };

    render() {
        let { form, children } = this.props;
        const {
          // 自定义属性
            type,
            labelWidth,
            width, // 整体宽度，默认 100%
            labelTip,
            tip,
            field,
            decorator,
            style,
            elementStyle,
            layout,
            forwardedRef,

            // Form.Item属性
            colon,
            extra,
            hasFeedback,
            help,
            label,
            labelCol,
            required,
            validateStatus,
            wrapperCol,

            // decorator属性 展开方便使用
            getValueFromEvent,
            initialValue,
            normalize,
            preserve,
            rules,
            trigger,
            validateFirst,
            validateTrigger,
            valuePropName,
            onChange,


            // 其他的会直接作为Form Element属性
            ...others
        } = this.props;

        if (layout) {
          form = null;
        }

        const { getFieldDecorator } = form || {};

        const nextDecorator = {
            getValueFromEvent,
            initialValue,
            normalize,
            preserve,
            rules,
            trigger,
            validateFirst,
            validateTrigger,
            valuePropName,
            onChange,

            ...decorator,
        };

        if (type === 'switch') {
            nextDecorator.valuePropName = 'checked';
        }

        if (type === 'transfer') {
            nextDecorator.valuePropName = 'targetKeys';
        }

        // 删除undefined属性，否则会引发错误
        Object.keys(nextDecorator).forEach(key => {
            const value = nextDecorator[key];
            if (value === void 0) {
                Reflect.deleteProperty(nextDecorator, key);
            }
        });

        // 处理整体样式
        const wrapperStyle = {};
        if (width !== void 0) {
            wrapperStyle.width = width;
            wrapperStyle.flexBasis = width;
            wrapperStyle.flexGrow = 0;
            wrapperStyle.flexShrink = 0;
        } else {
            wrapperStyle.flex = 1;
        }

        // 处理元素样式
        let eleStyle = { width: '100%' };
        eleStyle = { ...eleStyle, ...elementStyle };

        // 处理placeholder
        // eslint-disable-next-line no-void
        if (others.placeholder === void 0) {
            if (isInputLikeElement(type)) {
                others.placeholder = `请输入${label}`;
            } else if (type === 'date-range') {
                others.placeholder = ['开始日期', '结束日期'];
            } else {
                others.placeholder = `请选择${label}`;
            }
        }

        if (!nextDecorator.rules) nextDecorator.rules = [];

        // 如果存在required属性，自动添加必填校验
        if (required && !nextDecorator.rules.find(item => 'required' in item)) {
            nextDecorator.rules.push({ required: true, message: `${others.placeholder}!` });
        }

        let formLabel = label;
        if (labelTip) {
            formLabel = (
              <span>
                <Tooltip
                  placement="bottom"
                  title={labelTip}
                >
                  <Icon type="question-circle-o" style={{ marginRight: '4px' }} />
                </Tooltip>
                {label}
              </span>
            );
        }

        const elementProps = {
            ...others, ref: forwardedRef, style: eleStyle
        };

        if (form) {
            children = children ? React.cloneElement(children, elementProps) : null;
            children = getFieldDecorator(field, nextDecorator)(children || getElement({ type, ...elementProps }));
        }

        return (
          <div
            style={{ display: type === 'hidden' ? 'none' : 'flex', ...wrapperStyle, ...style }}
            className={styles.FormElement}
            // className="form-element-flex-root"
            // eslint-disable-next-line no-return-assign
            ref={node => this.container = node}
          >
            <FormItem
              colon={colon}
              extra={extra}
              hasFeedback={hasFeedback}
              help={help}
              label={formLabel}
              labelCol={labelCol}
              required={required}
              validateStatus={validateStatus}
              wrapperCol={wrapperCol}
            >
              {children}
            </FormItem>
            {tip ? <div className={styles.elementTip}>{tip}</div> : null}
          </div>
        );
    }
}

export default React.forwardRef((props, ref) => {
    return <FormElement {...props} forwardedRef={ref} />;
});
