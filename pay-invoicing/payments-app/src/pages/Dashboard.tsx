import { useState, useRef, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button as MuiButton,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  CreditCard as CreditCardIcon,
  PersonAdd as PersonAddIcon,
  Contacts as ContactsIcon,
  CardGiftcard as CardGiftcardIcon,
  Star as StarIcon,
  Security as SecurityIcon,
  Redeem as RedeemIcon,
  FlightTakeoff as FlightTakeoffIcon,
  GroupAdd as GroupAddIcon,
  Link as LinkIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DashboardHeading } from "@packages/ui";

// ── Data ────────────────────────────────────────────────────────────────

const getStartedSteps = [
  {
    step: "Step 1",
    title: "Add payment methods",
    description: "Add your credit cards and bank accounts to your Wallet.",
    icons: [
      <CreditCardIcon key="cc" sx={{ fontSize: 40, color: "#3866b0" }} />,
      <AccountBalanceIcon key="bank" sx={{ fontSize: 40, color: "#3866b0", opacity: 0.6 }} />,
    ],
  },
  {
    step: "Step 2",
    title: "Add your payees",
    description:
      "Add payees: businesses, government, card repayments and employees.",
    icons: [
      <PersonAddIcon key="pa" sx={{ fontSize: 40, color: "#3866b0" }} />,
      <ContactsIcon key="ct" sx={{ fontSize: 40, color: "#3866b0", opacity: 0.6 }} />,
    ],
  },
  {
    step: "Step 3",
    title: "Make a payment",
    description:
      "Make your first payment and start earning PayRewards Points!",
    icons: [
      <StarIcon key="star" sx={{ fontSize: 40, color: "#3866b0" }} />,
      <CardGiftcardIcon key="gift" sx={{ fontSize: 40, color: "#3866b0", opacity: 0.6 }} />,
    ],
  },
];

const guideCards = [
  {
    image: "/card-elements-cardmedia.png",
    title: "How to earn credit card reward points on your ATO tax bills",
    description:
      "For many businesses, tax bills from the Australian Taxation Office (ATO) are among the biggest ...",
  },
  {
    image: "/card-elements-cardmedia-1.png",
    title: "How to pay business rent with a credit card",
    description:
      "As any business owner knows, rent can be one of the biggest outgoing expenses, and one of the ...",
  },
];

const banners = [
  {
    id: "1",
    title: "Earn 20% bonus Velocity Points!*",
    description:
      "Transfer your PayRewards Points to Asia Miles and receive 30% extra Asia Miles. Terms and conditions apply.",
    imageUrl: "/image.png",
    primaryButtonText: "Transfer now",
    secondaryButtonText: "Learn more",
  },
  {
    id: "2",
    title: "Cathay Pacific is now available in PayRewards",
    description:
      "Transfer your PayRewards Points to Asia Miles and receive 30% extra Asia Miles. Terms and conditions apply.",
    imageUrl: "/cathay.png",
    primaryButtonText: "Transfer now",
    secondaryButtonText: "Learn more",
  },
  {
    id: "3",
    title: "Bonus 25% Velocity Points!",
    description:
      "Transfer your PayRewards Points to Velocity and receive 25% extra Velocity Points. Terms and conditions apply.",
    imageUrl: "/velocity.png",
    primaryButtonText: "Transfer now",
    secondaryButtonText: "Learn more",
  },
];

const recommendedActions: {
  icon: ReactNode;
  iconBg: string;
  title: string;
  linkText: string;
}[] = [
  {
    icon: <SecurityIcon sx={{ fontSize: 20, color: "#fff" }} />,
    iconBg: "#43A047",
    title: "Secure your account",
    linkText: "Create a Passkey",
  },
  {
    icon: <RedeemIcon sx={{ fontSize: 20, color: "#fff" }} />,
    iconBg: "#e53935",
    title: "Complete your Rewards profile",
    linkText: "Get started",
  },
  {
    icon: <FlightTakeoffIcon sx={{ fontSize: 20, color: "#fff" }} />,
    iconBg: "#3866b0",
    title: "Connect your travel partners",
    linkText: "Go to Rewards",
  },
  {
    icon: <GroupAddIcon sx={{ fontSize: 20, color: "#fff" }} />,
    iconBg: "#3866b0",
    title: "Invite users to join your account",
    linkText: "Invite",
  },
  {
    icon: <LinkIcon sx={{ fontSize: 20, color: "#fff" }} />,
    iconBg: "#0097A7",
    title: "Connect your Xero account",
    linkText: "Connect",
  },
  {
    icon: <CardGiftcardIcon sx={{ fontSize: 20, color: "#fff" }} />,
    iconBg: "#7B1FA2",
    title: "Refer and earn 10,000 points",
    linkText: "Go to referrals",
  },
];

// ── Sub-components ──────────────────────────────────────────────────────

/** Step card for the "Get started" section */
function StepCard({
  step,
  title,
  description,
  icons,
}: {
  step: string;
  title: string;
  description: string;
  icons: ReactNode[];
}) {
  return (
    <Card
      sx={{
        flex: 1,
        minWidth: 0,
        borderRadius: "6px",
        border: "1px solid #f5f5f5",
        boxShadow:
          "0px 1px 8px 0px rgba(0,0,0,0.05), 0px 2px 3px 0px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          flex: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: "#526973" }}>
          {step}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            color: "#283e48",
            fontSize: "16px",
            letterSpacing: "0.3px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#526973", lineHeight: 1.6 }}>
          {description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          px: 2,
          pb: 2,
          pt: 1,
        }}
      >
        {icons.map((icon, i) => (
          <Box key={i} sx={{ display: "flex" }}>
            {icon}
          </Box>
        ))}
      </Box>
    </Card>
  );
}

/** Vertical marketing banner for the right column */
function VerticalMarketingBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banner = banners[currentIndex];

  const goToPrev = () =>
    setCurrentIndex((i) => (i - 1 + banners.length) % banners.length);
  const goToNext = () =>
    setCurrentIndex((i) => (i + 1) % banners.length);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Card
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          bgcolor: "#f5f5f5",
          boxShadow: "0px 0px 0px 0px #e0e0e0",
        }}
      >
        {/* Image area */}
        <Box sx={{ height: 254, px: 2, pt: 2 }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              backgroundImage: `url(${banner.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>

        {/* Text + buttons */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 1.5,
            p: 3,
            minHeight: 200,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: 1.2,
                letterSpacing: "0.2px",
                color: "#283e48",
              }}
            >
              {banner.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#283e48", lineHeight: 1.6 }}
            >
              {banner.description}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <MuiButton
              variant="contained"
              sx={{
                bgcolor: "#3866b0",
                color: "#fff",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.5px",
                borderRadius: "6px",
                px: 1.5,
                py: 0.75,
                "&:hover": { bgcolor: "rgba(56,102,176,0.9)" },
              }}
            >
              {banner.primaryButtonText}
            </MuiButton>
            <MuiButton
              variant="text"
              sx={{
                color: "#3866b0",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.5px",
                px: 1,
                py: 0.75,
              }}
            >
              {banner.secondaryButtonText}
            </MuiButton>
          </Box>
        </CardContent>
      </Card>

      {/* Carousel indicator */}
      {banners.length > 1 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mt: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={goToPrev}
            sx={{
              p: 0.75,
              borderRadius: "4px",
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ChevronLeftIcon style={{ width: 20, height: 20, color: "#3866b0" }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            {banners.map((_, i) => (
              <Box
                key={i}
                component="button"
                onClick={() => setCurrentIndex(i)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "none",
                  p: 0,
                  cursor: "pointer",
                  bgcolor: currentIndex === i ? "#003c80" : "#d9d9d9",
                  "&:hover": {
                    bgcolor: currentIndex === i ? "#003c80" : "#bfbfbf",
                  },
                }}
              />
            ))}
          </Box>
          <IconButton
            size="small"
            onClick={goToNext}
            sx={{
              p: 0.75,
              borderRadius: "4px",
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ChevronRightIcon style={{ width: 20, height: 20, color: "#3866b0" }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

/** Single recommended action card */
function RecommendedActionCard({
  icon,
  iconBg,
  title,
  linkText,
  onDismiss,
}: {
  icon: ReactNode;
  iconBg: string;
  title: string;
  linkText: string;
  onDismiss?: () => void;
}) {
  return (
    <Card
      sx={{
        borderRadius: "6px",
        border: "1px solid #f5f5f5",
        boxShadow:
          "0px 1px 8px 0px rgba(0,0,0,0.05), 0px 2px 3px 0px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          "&:last-child": { pb: 2 },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        {/* Text */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              color: "#283e48",
              lineHeight: 1.4,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#3866b0",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {linkText}
          </Typography>
        </Box>

        {/* Dismiss */}
        <IconButton
          size="small"
          onClick={onDismiss}
          sx={{ color: "#526973", flexShrink: 0 }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </CardContent>
    </Card>
  );
}

// ── Main Dashboard Component ────────────────────────────────────────────

export const Dashboard = () => {
  const guidesScrollRef = useRef<HTMLDivElement>(null);

  const [dismissedActions, setDismissedActions] = useState<Set<number>>(
    new Set()
  );

  const handleDismissAction = (index: number) => {
    setDismissedActions((prev) => new Set(prev).add(index));
  };

  const handleGuidesScroll = (direction: "left" | "right") => {
    if (guidesScrollRef.current) {
      const amount = 320;
      guidesScrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const visibleActions = recommendedActions.filter(
    (_, i) => !dismissedActions.has(i)
  );

  return (
    <Box
      component="main"
      sx={{
        height: "calc(100vh - 66px)",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#fcfcfc",
        px: { xs: 2, sm: 4 },
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
          maxWidth: "1200px",
          width: "100%",
          alignItems: "flex-start",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* ── Left Column ───────────────────────────────────────── */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            minWidth: 0,
          }}
        >
          {/* Welcome heading */}
          <DashboardHeading title="Welcome, Jane" points="0" />

          {/* Get started heading */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: 1.2,
              letterSpacing: "0.2px",
              color: "#283e48",
            }}
          >
            Get started
          </Typography>

          {/* Step cards */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {getStartedSteps.map((s) => (
              <StepCard
                key={s.step}
                step={s.step}
                title={s.title}
                description={s.description}
                icons={s.icons}
              />
            ))}
          </Box>

          {/* Favourite payees */}
          <Card
            sx={{
              borderRadius: "6px",
              border: "1px solid #f5f5f5",
              bgcolor: "white",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: 1.2,
                    letterSpacing: "0.2px",
                    color: "#283e48",
                  }}
                >
                  Favourite payees
                </Typography>
                <MuiButton
                  variant="text"
                  sx={{
                    color: "#3866b0",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                  }}
                >
                  All payees
                </MuiButton>
              </Box>

              {/* Empty state */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  py: 3,
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.6,
                  }}
                >
                  <ContactsIcon sx={{ fontSize: 80, color: "#b0bec5" }} />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: 1.2,
                    letterSpacing: "0.2px",
                    color: "#283e48",
                    textAlign: "center",
                  }}
                >
                  Favourite payees
                </Typography>
                <Typography
                  sx={{
                    color: "#283e48",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    textAlign: "center",
                    maxWidth: 380,
                  }}
                >
                  Favourite the payees you pay frequently and they will appear
                  here for quick access.
                </Typography>
                <MuiButton
                  variant="text"
                  sx={{
                    color: "#3866b0",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Go to Payees
                </MuiButton>
              </Box>
            </CardContent>
          </Card>

          {/* Guides section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: 1.2,
                  letterSpacing: "0.2px",
                  color: "#283e48",
                }}
              >
                Guides
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleGuidesScroll("left")}
                  sx={{
                    p: 0.75,
                    borderRadius: "4px",
                    bgcolor: "rgba(255,255,255,0.8)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                  }}
                >
                  <ChevronLeftIcon style={{ width: 20, height: 20 }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleGuidesScroll("right")}
                  sx={{
                    p: 0.75,
                    borderRadius: "4px",
                    bgcolor: "rgba(255,255,255,0.8)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                  }}
                >
                  <ChevronRightIcon style={{ width: 20, height: 20 }} />
                </IconButton>
              </Box>
            </Box>

            <Box
              ref={guidesScrollRef}
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
            >
              {guideCards.map((card, index) => (
                <Card
                  key={index}
                  sx={{
                    flex: "1 1 0",
                    minWidth: 260,
                    borderRadius: "12px",
                    border: "1px solid #f5f5f5",
                    boxShadow:
                      "0px 1px 8px 1px rgba(0,0,0,0.05), 0px 2px 3px 0px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#fafafa" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={card.image}
                    alt={card.title}
                    sx={{ height: 134, objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "18px",
                        lineHeight: 1.2,
                        letterSpacing: "0.2px",
                        color: "#283e48",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#607d8b",
                        fontSize: "12px",
                        lineHeight: 1.6,
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Vertical Divider ──────────────────────────────────── */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", lg: "block" } }}
        />

        {/* ── Right Column ──────────────────────────────────────── */}
        <Box
          sx={{
            width: { xs: "100%", lg: 360 },
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Marketing banner */}
          <VerticalMarketingBanner />

          {/* Recommended actions heading */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: 1.2,
              letterSpacing: "0.2px",
              color: "#283e48",
            }}
          >
            Recommended actions
          </Typography>

          {/* Action cards */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {visibleActions.map((action) => (
              <RecommendedActionCard
                key={action.title}
                icon={action.icon}
                iconBg={action.iconBg}
                title={action.title}
                linkText={action.linkText}
                onDismiss={() =>
                  handleDismissAction(
                    recommendedActions.findIndex(
                      (a) => a.title === action.title
                    )
                  )
                }
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
