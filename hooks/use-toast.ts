'use client'

import { toast as sonnerToast, Toaster } from 'sonner'
import * as React from 'react'

// Types
type ToastProps = {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  variant?: 'default' | 'destructive'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: number
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
}

type ActionTypes = {
  ADD_TOAST: 'ADD_TOAST'
  UPDATE_TOAST: 'UPDATE_TOAST'
  DISMISS_TOAST: 'DISMISS_TOAST'
  REMOVE_TOAST: 'REMOVE_TOAST'
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type Action =
  | { type: ActionTypes['ADD_TOAST']; toast: ToasterToast }
  | { type: ActionTypes['UPDATE_TOAST']; toast: Partial<ToasterToast> }
  | { type: ActionTypes['DISMISS_TOAST']; toastId?: string }
  | { type: ActionTypes['REMOVE_TOAST']; toastId?: string }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: 'REMOVE_TOAST', toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }
    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }
    case 'DISMISS_TOAST': {
      const { toastId } = action
      if (toastId) {
        addToRemoveQueue(toastId)
        sonnerToast.dismiss(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
          sonnerToast.dismiss(toast.id)
        })
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return { ...state, toasts: [] }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
      return state
  }
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

function toast(props: Omit<ToasterToast, 'id'>) {
  const id = genId()

  const update = (props: Partial<ToasterToast>) =>
    dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } })

  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  const variantStyles =
    props.variant === 'destructive'
      ? { className: 'bg-red-500 text-white border-red-700 slide-in-out' }
      : { className: 'slide-in-out' }

  sonnerToast(props.title || '', {
    id,
    description: props.description,
    action: props.action,
    duration: props.duration || TOAST_REMOVE_DELAY,
    position: props.position || 'top-right',
    onDismiss: () => dismiss(),
    className: variantStyles.className, // Apply slide-in-out animation
    dismissible: true, // Ensure X button is present
  })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return { id, dismiss, update }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { useToast, toast, Toaster }
