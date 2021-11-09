import React, { PureComponent } from 'react';
import Chart from 'react-google-charts';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default class LineChart extends PureComponent {
    state = { values: [], viewWindow: { x: { min: 0, max: 1 }, t: { min: 0, max: 1 } } };
    componentDidMount = () => this.componentWillReceiveProps(this.props);
    componentWillReceiveProps = async nextProps => {
        this.setState({ values: [] });
        const { values, timeout } = nextProps;
        this.setState({
            viewWindow: {
                x: { min: Math.min(...values.map(v=>v.x)), max: Math.max(...values.map(v=>v.x)) },
                t: { min: Math.min(...values.map(v=>v.t)), max: Math.max(...values.map(v=>v.t)) },
            }
        });
        if (!timeout) {
            this.setState({ values });
            return;
        }
        const val = [];
        const copy = Object.assign([], values);
        val.push(copy.shift());
        this.setState({ values: val });
        while (copy.length) {
            await delay(timeout);
            val.push(copy.shift());
            await this.setState({ values: val, timestamp: new Date() });
        }
    };

    render() {
        const { values, viewWindow } = this.state;
        const { title } = this.props;
        return values.length && (<Chart
            width={'100%'}
            height={'600px'}
            chartType="LineChart"
            loader={<div>Cargando gráfico</div>}
            data={[
                ['t', 'x'],
                ...values.map(({ t, x }) => [t, x])
            ]}
            options={{
                title,
                titleTextStyle: {
                    fontSize: 24,
                    bold: false
                },
                hAxis: {
                    title: 't',
                    viewWindow: viewWindow.t
                },
                vAxis: {
                    title: 'x',
                    viewWindow: viewWindow.x
                }
            }}
        />)
    }
}

LineChart.defaultProps = {
    values: []
}