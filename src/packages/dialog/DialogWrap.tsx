import React, { FunctionComponent, HTMLAttributes } from 'react'
import { Content } from './Content'
import Mask from './Mask'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

interface DialogWrapProps {
  visible?: boolean
  mask?: boolean
  lockScroll?: boolean
  closeOnClickOverlay?: boolean
  onCancel?: Function
  onClosed?: Function
}

export const DialogWrap: FunctionComponent<
  Partial<DialogWrapProps> & HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { className, style, visible, mask, closeOnClickOverlay, lockScroll, onClosed, onCancel } =
    props

  const handleClick = (e: any) => {
    if (closeOnClickOverlay && visible && e.target === e.currentTarget) {
      onClosed?.()
      onCancel?.()

      lockScroll && document.body.classList.remove('nut-overflow-hidden')
    }
  }

  const wrapStyle = {
    ...style,
    display: visible ? 'block' : 'none',
  }

  if (lockScroll && visible) {
    document.body.classList.add('nut-overflow-hidden')
  }

  return (
    <>
      {mask ? (
        <CSSTransition
          in={visible}
          timeout={300}
          classNames="fadeDialog"
          unmountOnExit
          appear={true}
        >
          <Mask />
        </CSSTransition>
      ) : null}

      <div
        className={classNames('nut-dialog__wrap', className)}
        onClick={handleClick}
        style={wrapStyle}
      >
        <Content {...props} visible={visible} />
      </div>
    </>
  )
}

DialogWrap.displayName = 'NutDialogWrap'
