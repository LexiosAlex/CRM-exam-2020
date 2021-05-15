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
  TimeChartData: TimeChartData | null;
}

const COLORS = ['#ffe55e', '#ff0033', '#4BB543'];

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

  return TimeChartData ? (
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
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center" minWidth="300px">
      No data available
    </Box>
  );
};

export const Stats: React.FC = () => {
  const dayActivities: TimeChartData | null = useSelector((state: IAppState) =>
    selectors.statistics.getActivitiesByDay(state),
  );
  const weekActivities: TimeChartData | null = useSelector((state: IAppState) =>
    selectors.statistics.getActivitiesByWeek(state),
  );
  const monthActivities: TimeChartData | null = useSelector((state: IAppState) =>
    selectors.statistics.getActivitiesByMonth(state),
  );

  return (
    <StyledContainer
      marginTop="50px"
      marginLeft="50px"
      marginRight="50px"
      display="flex"
      flexDirection="column"
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
