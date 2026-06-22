import { useState, useEffect } from "react";
import type { ReactNode, JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
    Box,
    IconButton,
    Button as MuiButton,
    Typography,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Logout as LogoutIcon,
    ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { SideNav } from "../components/SideNav";
import { UserTypeSwitcher } from "@packages/user-model";

interface AppLayoutProps {
    children?: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopSidenavCollapsed, setIsDesktopSidenavCollapsed] =
        useState(false);
    const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 1024);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const isDesktop = window.innerWidth >= 1024;
            setIsDesktopView(isDesktop);
            if (isDesktop) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMenuToggle = () => {
        if (isDesktopView) {
            setIsDesktopSidenavCollapsed(!isDesktopSidenavCollapsed);
        } else {
            setIsMobileMenuOpen(!isMobileMenuOpen);
        }
    };

    const closeMobileSidenav = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <Box
            sx={{
                height: "100vh",
                backgroundColor: "#fcfcfc",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Box
                component="header"
                sx={{
                    display: "flex",
                    height: "66px",
                    alignItems: "center",
                    px: 1.5,
                    py: 3,
                    width: "100%",
                    bgcolor: "white",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    zIndex: 50,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleMenuToggle}
                        edge="start"
                        sx={{ width: 40, height: 40, p: 1 }}
                    >
                        <MenuIcon sx={{ height: 24, width: 24 }} />
                    </IconButton>
                    {/* Logo would go here if needed, but SideNav has branding too */}
                    <UserTypeSwitcher />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 1.25,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <MuiButton
                            component="a"
                            href="http://localhost:3000"
                            variant="outlined"
                            sx={{
                                height: "30px",
                                borderRadius: "999px",
                                borderColor: "#b7c9f0",
                                bgcolor: "white",
                                px: 1.5,
                                py: 0.5,
                                gap: 0.5,
                                textTransform: "none",
                                "&:hover": {
                                    bgcolor: "white",
                                    borderColor: "#b7c9f0",
                                },
                            }}
                            endIcon={
                                <ArrowForwardIcon sx={{ width: 16, height: 18, color: "#3866b0" }} />
                            }
                        >
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    color: "#3866b0",
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.50px",
                                    lineHeight: "21px",
                                }}
                            >
                                Rewards
                            </Typography>
                        </MuiButton>

                        {/* User info and logout */}
                        <IconButton
                            onClick={handleLogout}
                            title="Logout"
                            sx={{
                                height: 30,
                                width: 30,
                                border: "1px solid #b7c9f0",
                                bgcolor: "white",
                                p: 0.5,
                                "& .MuiSvgIcon-root": {
                                    color: "#3866b0",
                                },
                                "&:hover": {
                                    bgcolor: "#fee2e2", // red-50
                                    borderColor: "#fca5a5", // red-300
                                    "& .MuiSvgIcon-root": {
                                        color: "#dc2626", // red-600
                                    },
                                },
                            }}
                        >
                            <LogoutIcon sx={{ width: 16, height: 16 }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: "flex", width: "100%", position: "relative", height: "calc(100vh - 66px)" }}>
                {/* Sidenav for Desktop */}
                {isDesktopView && (
                    <SideNav
                        collapsed={isDesktopSidenavCollapsed}
                        isMobileView={false}
                    />
                )}

                {/* Sidenav for Mobile (Overlay) */}
                {!isDesktopView && isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <Box
                            sx={{
                                position: "fixed",
                                inset: 0,
                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                zIndex: 30,
                            }}
                            onClick={closeMobileSidenav}
                        />
                        {/* Mobile Sidenav Container */}
                        <Box
                            sx={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                height: "100%",
                                zIndex: 40,
                                width: 240, // SideNav width when not collapsed
                                boxShadow: 3,
                            }}
                        >
                            <SideNav
                                collapsed={false}
                                onClose={closeMobileSidenav}
                                isMobileView={true}
                            />
                        </Box>
                    </>
                )}

                {/* Main content */}
                <Box sx={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", width: "100%" }}>
                    {/* If children are passed, render them. Otherwise typical router outlet would be here */}
                    {children ? children : (
                        <Box sx={{ p: 3 }}>
                            {/* Placeholder for router outlet if we were using nested routes directly in layout */}
                            <Typography variant="h4">Page Content</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
