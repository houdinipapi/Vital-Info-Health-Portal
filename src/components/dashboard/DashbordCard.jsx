/* eslint-disable react/prop-types */
import { Card, CardContent, Typography } from '@mui/material';

const DashboardCard = ({ title, content }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
