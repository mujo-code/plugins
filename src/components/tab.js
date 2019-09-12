import { Ingress } from '@mujo/ingress'
import React, { useEffect, useContext } from 'react'
import { context } from './plugin-provider'

export const Tab = ({ name, children }) => {
  const { constants, tabs, env } = useContext(context)
  const { pushTab, removeTab, currentTab } = tabs

  useEffect(() => {
    pushTab(name)
    return removeTab(name)
  }, [name])

  if (env !== 'ntp') return null
  if (name !== currentTab) return null
  return <Ingress target={constants.TABS_TARGET}>{children}</Ingress>
}
