import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput/index'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
// import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
// import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
// import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
// import QuestionRadioConf, { QuestionRadioPropsType, QuestionRadioStatPropsType } from './QuestionRadio'
// import QuestionCheckboxConf, { QuestionCheckboxPropsType, QuestionCheckboxStatPropsType } from './QuestionCheckbox'

// 统一，各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType
// &
// QuestionParagraphPropsType &
// QuestionInfoPropsType &
// QuestionTextareaPropsType &
// QuestionRadioPropsType &
// QuestionCheckboxPropsType

// 统一，各个组件的统计属性类型
// type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

// 统一，组件的配置 type
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  // PropComponent: FC<ComponentPropsType>
  // StatComponent?: FC<ComponentStatPropsType>
}

// 全部的组件默认配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  // QuestionParagraphConf,
  // QuestionInfoConf,
  // QuestionTextareaConf,
  // QuestionRadioConf,
  // QuestionCheckboxConf,
]

// 组件分组
// export const componentConfGroup = [
//   {
//     groupId: 'textGroup',
//     groupName: '文本显示',
//     components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
//   },
//   {
//     groupId: 'inputGroup',
//     groupName: '用户输入',
//     components: [QuestionInputConf, QuestionTextareaConf],
//   },
//   {
//     groupId: 'chooseGroup',
//     groupName: '用户选择',
//     components: [QuestionRadioConf, QuestionCheckboxConf],
//   },
// ]

/**
 * @description 根据 type 获取对应的组件配置
 * @param type 组件的类型
 * @returns c type 类型的组件
 */
// 在画布中需要根据 type 获取对应的组件配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
