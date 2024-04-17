/**
 * @description 问卷 标题
 */

import Component from './Component'
// import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

// Title 组件的属性（中间部分）
export * from './interface'

// Title 组件的配置（右边部分）
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component, // 画布显示的组件
  // PropComponent,
  defaultProps: QuestionTitleDefaultProps,
}
