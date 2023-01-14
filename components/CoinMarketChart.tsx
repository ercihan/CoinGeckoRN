import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import { ICoin } from '../models/coin';

export interface CoinMarketChartProps {
  coin: ICoin;
}
export interface CoinMarketChartData {
  timestamp: any;
  value: any;
}
export interface CoinMarketChartState {
  data: CoinMarketChartData[] | undefined
}

export default class CoinMarketChart extends React.Component<CoinMarketChartProps, CoinMarketChartState> {
  constructor(props: CoinMarketChartProps) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    fetch("https://api.coingecko.com/api/v3/coins/" + this.props.coin.id + "/market_chart?vs_currency=usd&days=90&interval=daily").then((response) => response.json()).then((json) => {
      let datapoints: CoinMarketChartData[] = []
      for (let index = 0; index < json.prices.length; index++) {
        //labelValues.push(formatDate(new Date(json.prices[index][0])));
        datapoints.push({
          timestamp: json.prices[index][0],
          value: json.prices[index][1]
        })
      }
      this.setState({
        data: datapoints
      });
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    const window = Dimensions.get('window');
    return this.state.data ?
      <LineChart.Provider data={this.state.data}>
        <LineChart width={window.width * 0.8} height={window.height * 0.5}>
          <LineChart.Path />
          <LineChart.CursorCrosshair>
            <LineChart.Tooltip />
            <LineChart.Tooltip position="bottom">
              <LineChart.DatetimeText />
            </LineChart.Tooltip>
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Provider>
      : null;
  }
}

// import React, { useEffect } from 'react';
// import { useWindowDimensions } from 'react-native';
// import { LineChart } from 'react-native-wagmi-charts';
// import { ICoin } from '../models/coin';

// export interface CoinMarketChartProps {
//   coin: ICoin;
// }

// export interface CoinMarketChartData {
//   timestamp: any;
//   value: any;
// }

// export const CoinMarketChart = (props: CoinMarketChartProps) => {
//   const [data, setData] = React.useState<CoinMarketChartData[] | undefined>(undefined);
//   const { width, height } = useWindowDimensions();

//   useEffect(() => {
//     fetch("https://api.coingecko.com/api/v3/coins/" + props.coin.id + "/market_chart?vs_currency=usd&days=90&interval=daily").then((response) => response.json()).then((json) => {
//       let datapoints = []
//       for (let index = 0; index < json.prices.length; index++) {
//         //labelValues.push(formatDate(new Date(json.prices[index][0])));
//         datapoints.push({
//           timestamp: json.prices[index][0],
//           value: json.prices[index][1]
//         })
//       }
//       setData(datapoints);
//     }).catch((error) => {
//       console.error(error);
//     })
//     return () => { setData(undefined); }
//   }, [])

//   if (data) {
//     return (<LineChart.Provider data={data}>
//       <LineChart width={width * 0.8} height={height * 0.5}>
//         <LineChart.Path />
//         <LineChart.CursorCrosshair>
//           <LineChart.Tooltip />
//           <LineChart.Tooltip position="bottom">
//             <LineChart.DatetimeText />
//           </LineChart.Tooltip>
//         </LineChart.CursorCrosshair>
//       </LineChart>
//     </LineChart.Provider>)
//   } else {
//     return null;
//   }
// }

// // const styles = StyleSheet.create({
// //   chart: {
// //     width: '500px',
// //   },
// // });