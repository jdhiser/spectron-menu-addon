import * as React from 'react'
import { ipcRenderer } from 'electron'

export interface CounterState {
  count: number
}
export default class Counter extends React.Component<any, CounterState> {
  constructor(props: any) {
    super(props)
    this.state = { count: 0 }
  }

  componentDidMount() {
    ipcRenderer.on('SEND_COUNT', (e, count) => {
      this.setState({ count })
    })
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('SEND_COUNT')
  }

  render() {
    return (
      <h1>
        Count: <span id="count">{this.state.count}</span>
      </h1>
    )
  }
}
