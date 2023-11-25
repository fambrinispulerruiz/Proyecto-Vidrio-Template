import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import DashboardCard from "../shared/DashboardCard";

const activities = [
  {
    time: "09:50",
    color: "success.main",
    text: "Orden #10",
  },
  {
    time: "10:15",
    color: "success.main",
    text: "Orden #15",
  },
  {
    time: "11:00",
    color: "warning.main",
    text: "Orden #9 (Cancelado)",
  },
  {
    time: "16:00",
    color: "warning.main",
    text: "Entrega de Vehiculos",
  },
  {
    time: "17:00",
    color: "error.main",
    text: "Cierre",
  },
];

const DailyActivity = () => {
  return (
    <DashboardCard title="Ordenes de Hoy">
      <Timeline
        sx={{
          p: 0,
        }}
      >
        {activities.map((activity) => (
          <TimelineItem key={activity.time}>
            <TimelineOppositeContent
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                flex: "0",
              }}
            >
              {activity.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                sx={{
                  borderColor: activity.color,
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              color="text.secondary"
              sx={{
                fontSize: "14px",
              }}
            >
              {activity.text}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default DailyActivity;
