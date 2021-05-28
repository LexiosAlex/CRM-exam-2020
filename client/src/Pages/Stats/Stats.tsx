import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import Typography from '@material-ui/core/Typography';
import { IAllTimeData, TimeChartData } from '../../interfaces/statistics';
import { useSelector } from 'react-redux';
import { IAppState } from '../../interfaces/state';
import selectors from '../../selectors';
import { StyledContainer, StyledChartPaper, StyledAllStatsPaper } from './Stats.style';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation('statistics');

  return (
    <g>
      <text x={cx} y={cy - 10} dy={0} textAnchor="middle" fill={textColor ?? fill}>
        <tspan x={cx}>{payload.name}</tspan>
        <tspan x={cx} dy="1.2em">
          {t('totalDiagram', { value: value })}
        </tspan>
        <tspan x={cx} dy="1.2em">
          {t('percentDiagram', { value: (percent * 100).toFixed(2) })}
        </tspan>
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
  const { t } = useTranslation('statistics');

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
    <Typography variant="body1">{t('noData')}</Typography>
  );
};

export const Stats: React.FC = () => {
  const { t } = useTranslation('statistics');

  const dayActivities: TimeChartData | null = useSelector((state: IAppState) =>
    selectors.statistics.getActivitiesByDay(state),
  );
  const weekActivities: TimeChartData | null = useSelector((state: IAppState) =>
    selectors.statistics.getActivitiesByWeek(state),
  );
  const monthActivities: TimeChartData | null = useSelector((state: IAppState) =>
    selectors.statistics.getActivitiesByMonth(state),
  );

  const AllTimeData: IAllTimeData = useSelector((state: IAppState) =>
    selectors.statistics.getAllTimeStats(state),
  );

  return (
    <StyledContainer
      marginTop="50px"
      marginLeft="50px"
      marginRight="50px"
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h2">{t('statistics')}</Typography>
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
          <Typography variant="h3">{t('activitiesToday')}</Typography>
        </StyledChartPaper>
        <StyledChartPaper>
          <PieChartComponent TimeChartData={weekActivities} />
          <Typography variant="h3">{t('activitiesWeek')}</Typography>
        </StyledChartPaper>
        <StyledChartPaper>
          <PieChartComponent TimeChartData={monthActivities} />
          <Typography variant="h3">{t('activitiesMonth')}</Typography>
        </StyledChartPaper>
        <StyledAllStatsPaper>
          <ul>
            <li>
              <Typography variant="body1">
                {t('activitiesAllTime')} <span>{AllTimeData.activities}</span>
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                {t('volunteersTotal')} <span>{AllTimeData.volunteers}</span>
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                {t('totalHours')} <span>{AllTimeData.totalHours}</span>
              </Typography>
            </li>
          </ul>
          <Typography variant="h3">{t('allTime')}</Typography>
        </StyledAllStatsPaper>
      </Box>
    </StyledContainer>
  );
};
