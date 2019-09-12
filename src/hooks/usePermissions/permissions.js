import { useState, useEffect, useCallback } from 'react'
import { context } from '../../components/plugin-provider'


export const usePermissions = perms => {
  const [hasPermission, setHasPermission] = useState(false)
  const { permissions } = useContext(context)

  const requestPermissions = useCallback(async () => {
    if (hasPermission) return // no use asking for permissions we already have
    const granted = await permissions.request(perms)
    if (granted) {
      setHasPermission(granted)
    }
  }, [hasPermission, perms])

  const removePermissions = useCallback(async () => {
    if (!hasPermission) return // no use asking for permissions we already have
    const removed = await permissions.remove(perms)
    if (removed) {
      setHasPermission(false)
    }
  }, [hasPermission, perms])

  useEffect(() => {
    const check = async () => {
      const granted = await permissions.contains(perms)
      if (hasPermission !== granted) {
        setHasPermission(granted)
      }
    }
    check()
  }, [hasPermission, perms, setHasPermission])

  return {
    hasPermission,
    requestPermissions,
    removePermissions,
  }
}