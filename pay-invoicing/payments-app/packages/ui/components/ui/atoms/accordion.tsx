import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Box } from "@mui/material";
import type { SystemStyleObject, Theme } from "@mui/system";

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & { sx?: React.CSSProperties }
>(({ className, sx, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn("border-none", className)}
    style={sx}
    {...props}
  />
));
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & { sx?: SystemStyleObject<Theme> }
>(({ className, sx, ...props }, ref) => (
  <Box sx={sx}>
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-none", className)}
      {...props}
    />
  </Box>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & { sx?: SystemStyleObject<Theme> }
>(({ className, sx, children, ...props }, ref) => (
  <AccordionPrimitive.Header style={{ display: "flex", margin: 0 }}>
    <Box
      sx={{
        width: "100%",
        "& button[data-state=open] > svg": {
          transform: "rotate(180deg)",
        },
        ...sx as Record<string, unknown>,
      }}
    >
      <AccordionPrimitive.Trigger
        ref={ref}
        className={className}
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          font: "inherit",
          color: "inherit",
        }}
        {...props}
      >
        {children}
        <ChevronDown style={{ width: 16, height: 16, flexShrink: 0, color: "white", transition: "transform 200ms" }} />
      </AccordionPrimitive.Trigger>
    </Box>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & { sx?: SystemStyleObject<Theme> }
>(({ className, children, sx, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    style={{ overflow: "hidden", fontSize: "0.875rem" }}
    {...props}
  >
    <Box className={className} sx={{ pb: 2, pt: 0, ...sx as Record<string, unknown> }}>
      {children}
    </Box>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };