import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Button as MuiButton,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

interface BannerItem {
  id: string | number; // For React key prop
  title: string;
  description: string;
  imageUrl: string;
  primaryButtonText: string;
  onPrimaryButtonClick?: () => void;
  secondaryButtonText: string;
  onSecondaryButtonClick?: () => void;
  backgroundColour: string;
  theme: string;
}

interface MarketingBannerProps {
  banners: BannerItem[];
  autoplayDelay?: number; // Delay in milliseconds, e.g., 5000 for 5 seconds
}

const MarketingBanner = ({
  banners,
  autoplayDelay = 5000,
}: MarketingBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }, [banners.length]);

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (
      !banners ||
      banners.length <= 1 ||
      !autoplayDelay ||
      autoplayDelay <= 0
    ) {
      return; // No autoplay if 0/1 banner or invalid delay
    }

    const timer = setInterval(goToNext, autoplayDelay);
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [banners, autoplayDelay, goToNext]);

  if (!banners || banners.length === 0) {
    return null; // Don't render anything if there are no banners
  }

  const currentBanner = banners[currentIndex];
  const backgroundColour = currentBanner.backgroundColour;
  console.log(backgroundColour);

  // Define common font styles for reuse
  const h3Styles = {
    fontFamily: "var(--desktop-h3-font-family)", // Assuming you have these CSS variables defined
    fontWeight: "var(--desktop-h3-font-weight)",
    fontSize: "var(--desktop-h3-font-size)",
    letterSpacing: "var(--desktop-h3-letter-spacing)",
    lineHeight: "var(--desktop-h3-line-height)",
    fontStyle: "var(--desktop-h3-font-style)",
  };

  const body2RegularStyles = {
    fontFamily: "var(--desktop-body-2-regular-font-family)", // Assuming you have these CSS variables defined
    fontWeight: "var(--desktop-body-2-regular-font-weight)",
    fontSize: "var(--desktop-body-2-regular-font-size)",
    letterSpacing: "var(--desktop-body-2-regular-letter-spacing)",
    lineHeight: "var(--desktop-body-2-regular-line-height)",
    fontStyle: "var(--desktop-body-2-regular-font-style)",
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        maxWidth: "1200px",
        height: { xs: "fit-content", sm: "200px" },
        alignItems: "center",
        position: "relative",
        width: "100%",
      }}
    >
      {/* Outer container for the banner, controls overflow for sliding effect */}
      <Box
        sx={{
          position: "relative",
          flex: 1,
          alignSelf: "stretch",
          backgroundColor: backgroundColour,
          borderRadius: { xs: "16px", sm: "12px" },
          overflow: "hidden",
          border: "none",
        }}
      >
        {/* Sliding container holding all banner items */}
        <Box
          sx={{
            display: "flex",
            height: "100%",
            transition: "transform 700ms ease-in-out",
            width: `${banners.length * 100}%`, // Total width for all banners
            transform: `translateX(-${currentIndex * (100 / banners.length)}%)`, // Slide to the current banner
          }}
        >
          {banners.map((banner) => (
            // Each individual banner item
            <Box
              key={banner.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                position: "relative",
                alignSelf: "stretch",
                width: `${100 / banners.length}%`, // Each banner takes its share of the sliding container
              }}
            >
              <Box
                sx={{
                  display: { xs: "flex", sm: "none" },
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontWeight: '700',
                  paddingTop: { xs: "16px", sm: "24px" },
                  paddingBottom: 0,
                  paddingX: { xs: "16px", sm: "24px" },
                  flex: 1,
                  alignSelf: "stretch",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    flex: 1,
                    alignSelf: "stretch",
                    width: "100%",
                    minHeight: "280px",
                    borderRadius: "12px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${banner.imageUrl})`,
                  }}
                />
              </Box>
              {/* Content of the banner slide */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  gap: { xs: "40px", sm: "24px" },
                  padding: { xs: "24px", sm: "64px 32px" },
                  flex: 1,
                  alignSelf: "stretch",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "12px",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      ...h3Styles,
                      color: banner.theme === "dark" ? "#FFFFFF" : "#283e48",
                      fontFamily: "Europa-Bold",
                      fontWeight: '700',
                    }}
                  >
                    {banner.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      ...body2RegularStyles,
                      color:
                        banner.theme === "dark"
                          ? "var(--lightprimarycontrast)"
                          : "var(--lighttextsecondary)",
                      fontFamily: "Europa-Regular",
                    }}
                  >
                    {banner.description}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <MuiButton
                    variant="contained"
                    sx={{
                      backgroundColor: "#3866b0",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "rgba(56, 102, 176, 0.9)",
                      },
                      textTransform: "none",
                      fontWeight: "medium",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontFamily: "Europa-Bold",
                    }}
                    onClick={banner.onPrimaryButtonClick}
                  >
                    {banner.primaryButtonText}
                  </MuiButton>
                  <MuiButton
                    variant="text"
                    sx={{
                      color: "#3866b0",
                      backgroundColor:
                        banner.theme === "dark"
                          ? "var(--lightprimarycontrast)"
                          : "transparent",
                      "&:hover": {
                        backgroundColor:
                          banner.theme === "dark"
                            ? "rgb(229, 231, 235)"
                            : "rgba(56, 102, 176, 0.1)",
                      },
                      textTransform: "none",
                      fontWeight: "medium",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontFamily: "Europa-Bold",
                    }}
                    onClick={banner.onSecondaryButtonClick}
                  >
                    {banner.secondaryButtonText}
                  </MuiButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                  paddingTop: "16px",
                  paddingBottom: 0,
                  paddingX: "16px",
                  flex: 1,
                  alignSelf: "stretch",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    flex: 1,
                    alignSelf: "stretch",
                    width: "100%",
                    minHeight: "234px",
                    borderRadius: "16px 16px 0px 0px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${banner.imageUrl})`,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Carousel controls: Positioned at the bottom right of the section */}
      {banners.length > 1 && (
        <Box
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            position: "absolute",
            bottom: "16px",
            right: "24px",
            backgroundColor: "white",
            borderRadius: "150px",
            padding: "4px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          <IconButton
            onClick={goToPrev}
            aria-label="Previous slide"
            size="small" // MUI IconButton size
            sx={{
              padding: "6px", // p-1.5
              backgroundColor: "rgba(255, 255, 255, 0.8)", // #ffffffcc
              borderRadius: "4px", // rounded
              "&:hover": {
                backgroundColor: "white",
              },
              "&:focus": {
                // Approximating focus:ring-2 focus:ring-[#3866b0]/50
                outline: "2px solid rgba(56, 102, 176, 0.5)",
                outlineOffset: "2px",
              },
            }}
          >
            <ChevronLeftIcon
              style={{ width: "16px", height: "16px", color: "#3866b0" }}
            />
          </IconButton>

          <Box
            sx={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            {banners.map((_, index) => (
              <Box
                component="button"
                key={`dot-${index}`}
                onClick={() => goToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                sx={{
                  width: "8px", // w-2
                  height: "8px", // h-2
                  borderRadius: "50%", // rounded-full
                  transition: "background-color 300ms",
                  cursor: "pointer",
                  border: "none",
                  padding: 0,
                  backgroundColor:
                    currentIndex === index
                      ? "var(--lightprimarydark)"
                      : "#d9d9d9", // bg-lightprimarydark or bg-[#d9d9d9]
                  "&:hover": {
                    backgroundColor:
                      currentIndex === index
                        ? "var(--lightprimarydark)"
                        : "#bfbfbf", // hover:bg-[#bfbfbf]
                  },
                  "&:focus": {
                    // Approximating focus:outline-none
                    outline: "none",
                  },
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={goToNext}
            aria-label="Next slide"
            size="small"
            sx={{
              padding: "6px", // p-1.5
              backgroundColor: "rgba(255, 255, 255, 0.8)", // #ffffffcc
              borderRadius: "4px", // rounded
              "&:hover": {
                backgroundColor: "white",
              },
              "&:focus": {
                // Approximating focus:ring-2 focus:ring-[#3866b0]/50
                outline: "2px solid rgba(56, 102, 176, 0.5)",
                outlineOffset: "2px",
              },
            }}
          >
            <ChevronRightIcon
              style={{ width: "16px", height: "16px", color: "#3866b0" }}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default MarketingBanner;
