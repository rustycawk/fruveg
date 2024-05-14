import React, { useEffect } from 'react'
import { useStores } from '../../store/MobXProvider'
import { observer } from 'mobx-react-lite'

type Props = {}

const Page = (props: Props) => {
  const { routerStore } = useStores()
  useEffect(() => {
    routerStore.setCurrentPath('/orders')
  }, [])
  return (
    <div>Index</div>
  )
}

export default observer(Page)