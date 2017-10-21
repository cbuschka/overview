import React, {Component} from 'react';
import './App.css';
import {BlockContainer} from './Block';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            data: {}
        };
    }

    componentDidMount() {
        var self = this;

        var ws;

        function openWs() {
            ws = new WebSocket("ws://localhost:3000/ws");
            ws.onopen = function () {
                console.log("opened")
                self.setState({connected: true, data: self.state.data})
            }
            ws.onerror = function (err) {
                console.log("open failed: %o, reopening", err)
                self.setState({connected: false, data: self.state.data})
            }
            ws.onmessage = function (ev) {
                console.log("message")
                var data = JSON.parse(ev.data);
                self.setState({connected: true, data: data})
            }
            ws.onclose = function () {
                console.log("closed")
                ws = undefined;
                setTimeout(openWs, 1000);
                self.setState({connected: false, data: self.state.data})
            }
        }

        openWs();
    }

    componentWillUnmount() {
    }

    render() {
        var data = this.state.data;

        return (
            <div className="App">
                <BlockContainer groups={data.customers}/>
            </div>
        );
    }
}

export default App;
