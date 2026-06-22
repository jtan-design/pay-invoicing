import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type FrequentlyAskedQuestionsProps = {
  question: string;
  answer: string;
  index: number;
};

const FrequentlyAskedQuestions = ({
  question,
  answer,
  index,
}: FrequentlyAskedQuestionsProps) => {
  const theme = useTheme();
  const [expandedAccordion, setExpandedAccordion] = React.useState<
    string | false
  >(false);

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false);
    };

  return (
    <Accordion
      key={question}
      expanded={expandedAccordion === `panel-${question}`}
      onChange={handleAccordionChange(`panel-${question}`)}
      disableGutters
      elevation={0}
      square
      sx={{
        "&:before": { display: "none" },
        borderBottom:
          index < 1 ? "1px solid rgba(0,0,0,0.12)" : "none",
        "&:last-of-type": {
          borderBottom: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#283e48" }} />}
        aria-controls={`panel-${question}-content`}
        id={`panel-${question}-header`}
        sx={{
          paddingX: theme.spacing(2),
          paddingY: theme.spacing(1.5),
          fontFamily: "'Europa-Regular', Helvetica",
          fontWeight: "normal",
          color: "#283e48",
          fontSize: "1rem",
          letterSpacing: "0px",
          lineHeight: "25.6px",
          minHeight: "auto",
          "&.Mui-expanded": {
            minHeight: "auto",
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
            "&.Mui-expanded": {
              margin: 0,
            },
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "inherit",
            fontWeight: "inherit",
            color: "inherit",
            fontSize: "inherit",
            letterSpacing: "inherit",
            lineHeight: "inherit",
          }}
        >
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          paddingX: theme.spacing(2),
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(2),
        }}
      >
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FrequentlyAskedQuestions;
