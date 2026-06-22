import * as React from "react";

import { cn } from "../../../lib/utils";

// Add this interface to support the sx prop
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: React.CSSProperties;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, sx, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className,
      )}
      style={sx}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Add this interface to support the sx prop for CardTitle
interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: React.CSSProperties;
}

const CardTitle = React.forwardRef<
  HTMLDivElement,
  CardTitleProps // Use the new interface here
>(({ className, sx, ...props }, ref) => ( // Destructure sx from props
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    style={sx} // Apply sx to the style attribute
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// Add this interface to support the sx prop for CardDescription
interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: React.CSSProperties;
}

const CardDescription = React.forwardRef<
  HTMLDivElement,
  CardDescriptionProps // Use the new interface here
>(({ className, sx, ...props }, ref) => ( // Destructure sx from props
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    style={sx} // Apply sx to the style attribute
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: React.CSSProperties;
}

const CardContent = React.forwardRef<
  HTMLDivElement,
  CardContentProps
>(({ className, sx, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    style={sx}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
