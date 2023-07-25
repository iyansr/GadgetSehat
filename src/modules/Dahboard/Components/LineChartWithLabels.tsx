/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory-native';

interface DataPoint {
  x: string;
  y: number;
}

interface LineChartWithLabelsProps {
  data: number[];
  labels: string[];
}

const LineChartWithLabels: React.FC<LineChartWithLabelsProps> = ({ data, labels }) => {
  const contentInset = { top: 20, bottom: 20, left: 20, right: 60 };
  const chartData: DataPoint[] = data.map((value, index) => ({
    x: labels[index],
    y: value,
  }));

  return (
    <View style={{ flexDirection: 'row', height: 300 }}>
      <VictoryAxis dependentAxis tickFormat={tick => tick.toString()} />
      <VictoryChart>
        <VictoryLine data={chartData} />
        {/* Custom label component */}
        <Labels data={chartData} contentInset={contentInset} />
      </VictoryChart>
    </View>
  );
};

interface LabelsProps {
  data: DataPoint[];
  contentInset: { top: number; bottom: number; left: number; right: number };
}

const Labels: React.FC<LabelsProps> = ({ data, contentInset }) => {
  return data.map((point, index) => (
    <VictoryLabel
      key={index}
      x={contentInset.left + contentInset.right}
      y={contentInset.top + (contentInset.bottom / (data.length - 1)) * index}
      textAnchor="start"
      text={`${point.y}`}
    />
  ));
};

export default LineChartWithLabels;
