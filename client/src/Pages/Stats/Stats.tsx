import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import { PieChart, Pie, Sector, Tooltip, Cell } from 'recharts';
import TabPanel from '../../components/TabPanel';
import { StyledTabsPaper, StyledTabs } from './Stats.style';

interface ChartData {
  name: string;
  value: number;
  textColor?: string;
}

type TimeChartData = ChartData[];

interface PieChartComponentProps {
  TimeChartData;
}

const tasksData: TimeChartData[] = [
  [
    { name: 'Created', value: 16, textColor: '#323232' },
    { name: 'Done', value: 10 },
    { name: 'Canceled', value: 3 },
  ],
  [
    { name: 'Created', value: 100, textColor: '#323232' },
    { name: 'Done', value: 70 },
    { name: 'Canceled', value: 20 },
  ],
  [
    { name: 'Created', value: 800, textColor: '#323232' },
    { name: 'Done', value: 540 },
    { name: 'Canceled', value: 137 },
  ],
];

const COLORS = ['#ffe55e', '#4BB543', '#ff0033'];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    textColor,
  } = props;
  return (
    <g>
      <text x={cx} y={cy - 10} dy={0} textAnchor="middle" fill={textColor ?? fill}>
        <tspan x={cx}>{payload.name}</tspan>
        <tspan x={cx} dy="1.2em">{`Total: ${value}`}</tspan>
        <tspan x={cx} dy="1.2em">{`It's (${(percent * 100).toFixed(2)}%)`}</tspan>
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const PieChartComponent: React.FC<PieChartComponentProps> = ({ TimeChartData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <PieChart width={300} height={300}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={TimeChartData}
        cx={150}
        cy={150}
        innerRadius={90}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
        isAnimationActive={false}
      >
        {TimeChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

//TODO: refactor it
export const Stats: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleChangeTab = (_: React.ChangeEvent<{}>, tabIndex: number) => {
    setActiveTabIndex(tabIndex);
  };

  return (
    <Box marginTop="1rem" marginLeft="50px" marginRight="50px">
      <Box display="flex" flexDirection="column" width="100%">
        <StyledTabsPaper>
          <StyledTabs value={activeTabIndex} onChange={handleChangeTab} centered>
            <Tab label="Activities today" />
            <Tab label="Activities this week" />
            <Tab label="Activities this month" />
          </StyledTabs>
        </StyledTabsPaper>
        <h2>Statistics</h2>
        <TabPanel value={activeTabIndex} index={0}>
          <PieChartComponent TimeChartData={tasksData[0]} />
        </TabPanel>
        <TabPanel value={activeTabIndex} index={1}>
          <PieChartComponent TimeChartData={tasksData[1]} />
        </TabPanel>
        <TabPanel value={activeTabIndex} index={2}>
          <PieChartComponent TimeChartData={tasksData[2]} />
        </TabPanel>
      </Box>
    </Box>
  );
};
