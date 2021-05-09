import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { StyledContainer, StyledChartPaper } from './Stats.style';
import Typography from '@material-ui/core/Typography';
import { TimeChartData } from '../../interfaces/statistics';
import { useSelector } from 'react-redux';
import { IAppState } from '../../interfaces/state';
import selectors from '../../selectors';

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

export const Stats: React.FC = () => {
  const dayActivities: TimeChartData = useSelector((state: IAppState) =>
    selectors.statistics.getActivitiesByDay(state),
  );
  const weekActivities: TimeChartData = useSelector((state: IAppState) =>
    selectors.statistics.getActivitiesByWeek(state),
  );
  const monthActivities: TimeChartData = useSelector((state: IAppState) =>
    selectors.statistics.getActivitiesByMonth(state),
  );

  console.log(dayActivities);

  return (
    <StyledContainer
      marginTop="50px"
      marginLeft="50px"
      marginRight="50px"
      display="flex"
      flexDirection="column"
      width="100%"
    >
      <Typography variant="h2">Statistics</Typography>
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        maxWidth="650px"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <StyledChartPaper>
          <PieChartComponent TimeChartData={dayActivities} />
          <Typography variant="h3">Activities today</Typography>
        </StyledChartPaper>
        <StyledChartPaper>
          <PieChartComponent TimeChartData={weekActivities} />
          <Typography variant="h3">Activities this week</Typography>
        </StyledChartPaper>
        <StyledChartPaper>
          <PieChartComponent TimeChartData={monthActivities} />
          <Typography variant="h3">Activities this month</Typography>
        </StyledChartPaper>
      </Box>
    </StyledContainer>
  );
};
