/**
 * @description 问卷 输入框
 */

import Component from './Component'
// import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './interface'

// Input 组件的属性（中间部分）
export * from './interface'

// Input 组件的配置（右边部分）
export default {
  title: '输入框',
  type: 'questionInput', // 要和后端统一好
  Component, // 画布显示的组件
  // PropComponent, // 修改属性
  defaultProps: QuestionInputDefaultProps,
}
