import React, { Component } from 'react';

const mystyle = {
  box: {
  display: 'flex',
  position: 'fixed',
  top: 30,
  zIndex: "5",
  justifyContent: 'center',
  alignItems: 'center',
  color: "white",
  padding: "2px",
  fontSize: "16px",
  width: "100vw",
  height: "30px",
  },
  text: {
    backgroundColor: "red",
    padding: "0px 60px",
    borderRadius: "5px"
  }
}

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
              })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing)
              });
            }).catch(() => this.setState({ isDisconnected: true }) )
          }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <div>
          { isDisconnected && (<div style={mystyle.box}>
            <div style={mystyle.text}>
              <p>Internet connection lost</p>
            </div>
            </div>
            )
          }
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  return NetworkDetector;
}