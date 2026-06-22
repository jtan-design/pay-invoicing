import Box from "@mui/material/Box";
import { Body1 } from "../../../typography";

type ValuePropSlotProps = {
  title: string;
  description: string;
  iconSrc: string;
};

const ValuePropSlot = ({ title, description, iconSrc }: ValuePropSlotProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          paddingTop: '12px',
        }}
      >
        <img src={iconSrc} alt={title} width={40} height={40} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: '4px',
        }}
      >
        <Body1 fontBold alignText="left">{title}</Body1>
        <Body1 fontSecondary alignText="left">{description}</Body1>
      </Box>
    </Box>
  );
};

export { ValuePropSlot };
