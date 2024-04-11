import React from 'react'
import PropTypes from 'prop-types'
import './QuesttionCard.css'

const QuestionCard = props => {
  const { id, title, isPublished } = props
  // 编辑问卷
  const edit = (id: string) => {
    console.log(`编辑问卷${id}`)
  }

  return (
    <div key={id} className="list-item">
      <strong> {title}</strong>
      &nbsp;
      {isPublished ? (
        <span style={{ color: 'green' }}>已发布</span>
      ) : (
        <span style={{ color: 'red' }}>未发布</span>
      )}
      &nbsp;
      <button
        onClick={() => {
          edit(id)
        }}
      >
        编辑问卷
      </button>
    </div>
  )
}

QuestionCard.propTypes = {
  id: PropTypes.string.isRequired, // 假设 id 是一个数字类型，且为必需属性
  title: PropTypes.string.isRequired,
  isPublished: PropTypes.bool.isRequired,
}

export default QuestionCard
