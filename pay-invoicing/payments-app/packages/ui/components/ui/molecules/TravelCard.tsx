import {
  Card,
  Typography,
  Box,
  Chip,
  useTheme,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export interface TravelCardProps {
  /**
   * The title of the travel card
   */
  title: string;
  /**
   * The description text displayed below the title
   */
  description: string;
  /**
   * Array of characteristics to display at the bottom (e.g., ["Available 24/7", "Flexible"])
   */
  characteristics?: string[];
  /**
   * Whether to show the "New" badge
   */
  showNewBadge?: boolean;
  /**
   * Optional link destination (defaults to /travel-hub)
   */
  to?: string;
  /**
   * Optional custom content to render in the card
   */
  children?: ReactNode;
  /**
   * The image to display in the card
   */
  image: string;
}

/**
 * TravelCard Component
 *
 * A production-grade card component for displaying travel-related information.
 * Features smooth animations, full accessibility support, and responsive design.
 *
 * @component
 * @example
 * ```tsx
 * <TravelCard
 *   title="Rewards Seats Itinerary Finder"
 *   description="Add your credit cards and bank accounts to your Wallet."
 *   characteristics={["Available 24/7", "Flexible"]}
 *   showNewBadge={true}
 * />
 * ```
 */
export function TravelCard({
  title,
  description,
  characteristics = [],
  showNewBadge = false,
  to = "/travel-hub",
  image,
  children,
}: TravelCardProps) {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      style={{
        display: "flex",
        width: "100%",
        overflow: "visible",
      }}
    >
      <Link
        to={to}
        style={{
          textDecoration: "none",
          width: "100%",
          display: "flex",
          overflow: "visible",
        }}
        aria-label={`Navigate to ${title}`}
      >
        <Card
          component="article"
          role="link"
          tabIndex={0}
          aria-label={`${title}. ${description}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.location.href = to;
            }
          }}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.action.hover}`,
            borderRadius: "6px",
            padding: theme.spacing(3),
            boxShadow: "none",
            position: "relative",
            overflow: "visible",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              boxShadow:
                "0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.04)",
              transform: "translateY(-2px)",
            },
            "&:focus-visible": {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: "2px",
            },
            "&:active": {
              transform: "translateY(0px)",
            },
          }}
        >
          {/* New Badge - Positioned absolutely at top-right */}
          {showNewBadge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                top: "-18px",
                right: "24px",
                zIndex: 1,
              }}
            >
              <Chip
                label="New"
                size="small"
                sx={{
                  backgroundColor: theme.palette.success.shade4p,
                  color: theme.palette.success.dark,
                  border: `1px solid ${theme.palette.success.shade50p}`,
                  borderRadius: "999px",
                  height: "auto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  letterSpacing: "0.16px",
                  padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
                  fontFamily: theme.typography.fontFamily,
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            </motion.div>
          )}

          {/* Wrapper Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(1),
              width: "100%",
              position: "relative",
            }}
          >
            {/* Content Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(2),
                width: "100%",
                position: "relative",
              }}
            >
              {/* Text Content */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.spacing(1),
                }}
              >
                {/* Title */}
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: "0.2px",
                    color: theme.palette.text.primary,
                    margin: 0,
                  }}
                >
                  {title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  component="p"
                  sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: theme.palette.text.secondary,
                    margin: 0,
                  }}
                >
                  {description}
                </Typography>
              </Box>

              {/* Custom Children Content */}
              {children && (
                <Box
                  sx={{
                    marginTop: theme.spacing(1),
                  }}
                >
                  {children}
                </Box>
              )}
            </Box>

            {/* Characteristics Section */}
            {characteristics.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing(1),
                    marginTop: theme.spacing(2),
                    flexWrap: "wrap",
                  }}
                >
                  {characteristics.map((characteristic, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing(1),
                      }}
                    >
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          fontFamily: theme.typography.fontFamily,
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: 1.2,
                          letterSpacing: "0.16px",
                          color: theme.palette.primary.main,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {characteristic}
                      </Typography>
                      {index < characteristics.length - 1 && (
                        <Typography
                          component="span"
                          sx={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "20px",
                            color: theme.palette.text.secondary,
                            width: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-hidden="true"
                        >
                          •
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Image Section */}
          <CardMedia
            component="img"
            src={image}
            alt={title}
            sx={{
              display: "block",
              width: "80px",
              height: "80px",
              objectFit: "contain",
            }}
          />
        </Card>
      </Link>
    </motion.div>
  );
}
