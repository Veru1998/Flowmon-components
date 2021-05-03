import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Component2 from "./components/Component2";
import Component3 from "./components/Component3";
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';

/**
 * Passing JSON as object to component props
 */
let property = require("./properties/c2_property.json");
let incidents = [];
incidents.push(require("./incidents/incident2.json"));
incidents.push(require("./incidents/incident3.json"));
incidents.push(require("./incidents/incident4.json"));
incidents.push(require("./incidents/incident5.json"));

let incident = require("./incidents/i3_3.json");
let description = require("./properties/descr1.json"); 

/**
 * Gather data for bar chart.
 */
let barData = []; 
let barKeys = [];
let barSum = [];
incidents.forEach(e => {
    e.states.forEach(s => {
        if (barKeys.includes(s.priority) == false) {
            barKeys.push(s.priority);
            barSum.push(1);
        }
        else {
            barSum[barKeys.indexOf(s.priority)]++;
        }
    })
});
barKeys.forEach((k, i) => {
    barData.push({"priority": k, "sum": barSum[i]})
})
function compare(a, b) {
    const pA = a.priority;
    const pB = b.priority;
  
    let comparison = 0;
    if (pA > pB) {
      comparison = 1;
    } else if (pA < pB) {
      comparison = -1;
    }
    return comparison;
  }
barData.sort(compare)

/**
 * Gather data for line chart.
 */
let lineData = 
[
    {
      "id": "new",
      "data": [
        {
          "x": "20/12",
          "y": 1
        },
        {
          "x": "27/12",
          "y": 1
        },
        {
          "x": "03/01",
          "y": 1
        },
        {
          "x": "10/01",
          "y": 0
        },
        {
          "x": "17/01",
          "y": 0
        },
        {
          "x": "24/01",
          "y": 0
        },
        {
          "x": "31/01",
          "y": 1
        },
        {
          "x": "07/02",
          "y": 0
        },
        {
          "x": "14/02",
          "y": 1
        },
        {
          "x": "21/02",
          "y": 0
        },
        {
          "x": "28/02",
          "y": 0
        }
      ]
    },
    {
      "id": "active",
      "data": [
        {
          "x": "20/12",
          "y": 0
        },
        {
          "x": "27/12",
          "y": 1
        },
        {
          "x": "03/01",
          "y": 2
        },
        {
          "x": "10/01",
          "y": 2
        },
        {
          "x": "17/01",
          "y": 1
        },
        {
          "x": "24/01",
          "y": 1
        },
        {
          "x": "31/01",
          "y": 2
        },
        {
          "x": "07/02",
          "y": 1
        },
        {
          "x": "14/02",
          "y": 1
        },
        {
          "x": "21/02",
          "y": 1
        },
        {
          "x": "28/02",
          "y": 1
        }
      ]
    },
    {
      "id": "onhold",
      "data": [
        {
          "x": "20/12",
          "y": 0
        },
        {
          "x": "27/12",
          "y": 0
        },
        {
          "x": "03/01",
          "y": 0
        },
        {
          "x": "10/01",
          "y": 0
        },
        {
          "x": "17/01",
          "y": 1
        },
        {
          "x": "24/01",
          "y": 1
        },
        {
          "x": "31/01",
          "y": 1
        },
        {
          "x": "07/02",
          "y": 1
        },
        {
          "x": "14/02",
          "y": 1
        },
        {
          "x": "21/02",
          "y": 1
        },
        {
          "x": "28/02",
          "y": 0
        }
      ]
    },
    {
      "id": "closed",
      "data": [
        {
          "x": "20/12",
          "y": 0
        },
        {
          "x": "27/12",
          "y": 0
        },
        {
          "x": "03/01",
          "y": 0
        },
        {
          "x": "10/01",
          "y": 0
        },
        {
          "x": "17/01",
          "y": 1
        },
        {
          "x": "24/01",
          "y": 1
        },
        {
          "x": "31/01",
          "y": 1
        },
        {
          "x": "07/02",
          "y": 1
        },
        {
          "x": "14/02",
          "y": 2
        },
        {
          "x": "21/02",
          "y": 1
        },
        {
          "x": "28/02",
          "y": 1
        }
      ]
    },
    {
      "id": "reopened",
      "data": [
        {
          "x": "20/12",
          "y": 0
        },
        {
          "x": "27/12",
          "y": 0
        },
        {
          "x": "03/01",
          "y": 0
        },
        {
          "x": "10/01",
          "y": 0
        },
        {
          "x": "17/01",
          "y": 0
        },
        {
          "x": "24/01",
          "y": 0
        },
        {
          "x": "31/01",
          "y": 0
        },
        {
          "x": "07/02",
          "y": 0
        },
        {
          "x": "14/02",
          "y": 0
        },
        {
          "x": "21/02",
          "y": 0
        },
        {
          "x": "28/02",
          "y": 0
        }
      ]
    }, 
]

// first render C3 => low level view
ReactDOM.render(<Component3 
    incident={incident} 
    description={{"height": 0}} 
    property={property}
/>, document.getElementById("root2"));

// render C2 => medium level view
ReactDOM.render(<Component2 
    property={property} 
    incidents={incidents} 
    description={description} 
/>, document.getElementById("root"));

// render line chart with history data => top level view
ReactDOM.render(<ResponsiveLine
    data={lineData}
    margin={{ top: 50, right: 30, bottom: 50, left: 80 }}
    xScale={{ type: 'point' }} //'time', format: "%Y-%m-%d %H:%M", precision: "day" }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    yFormat= " >-.2f" //"time:%Hh"
    axisTop={null}
    axisRight={null}
    axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickValues: 10,
        tickRotation: 0,
        //format: "%d/%m",
        legend: 'States',
        legendPosition: 'middle',
        legendOffset: 30
    }}
    axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    colors={{ scheme: 'paired' }}
    legends={[
      {
          anchor: 'top-left ',
          direction: 'row',
          justify: false,
          translateY: -30,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1
              }
            }
          ]
      }]}
/>, document.getElementById("root3"));

// render bar chart => top level view
ReactDOM.render(<ResponsiveBar
    data={barData}
    keys={[ 'sum' ]}
    indexBy="priority"
    margin={{ top: 50, right: 60, bottom: 50, left: 30 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'paired' }}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Priority',
        legendPosition: 'middle',
        legendOffset: 30
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
/>, document.getElementById("root4")); 