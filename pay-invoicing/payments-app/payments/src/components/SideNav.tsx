import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Avatar,
    Badge,
    IconButton,
    Button
} from "@mui/material";
import {
    ExpandLess,
    ExpandMore,
    HomeRounded,
    AddCardRounded,
    Payments,
    HowToRegRounded,
    AccountBalanceWalletRounded,
    Settings,
    AccessTimeFilled,
    Close,
    ReceiptLongRounded,
} from "@mui/icons-material";

interface SideNavProps {
    collapsed?: boolean;
    onClose?: () => void;
    isMobileView?: boolean;
}

export const SideNav = ({ collapsed, onClose, isMobileView }: SideNavProps) => {
    const location = useLocation();
    const [paymentsOpen, setPaymentsOpen] = useState(true);

    const handlePaymentsClick = () => {
        setPaymentsOpen(!paymentsOpen);
    };

    const isActive = (path: string, prefix = false) =>
        prefix ? location.pathname.startsWith(path) : location.pathname === path;

    const content = (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#3866b0", // Based on the blue background in screenshot/HTML context
                color: "white",
                overflowY: "auto",
            }}
        >
            {isMobileView && (
                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                    <IconButton onClick={onClose} sx={{ color: "white" }}>
                        <Close />
                    </IconButton>
                </Box>
            )}

            {/* Header */}
            <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                    sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        width: 40,
                        height: 40,
                        borderRadius: 1, // Rounded square look
                    }}
                >
                    P
                </Avatar>
                {!collapsed && (
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                            PAY.COM.AU LIMITED
                        </Typography>
                    </Box>
                )}
                {!collapsed && (
                    <ExpandMore sx={{ color: "white" }} />
                )}
            </Box>

            {/* Menu Items */}
            <List component="nav" sx={{ px: 1 }}>
                <ListItemButton
                    component={Link}
                    to="/account"
                    selected={isActive("/account")}
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&.Mui-selected": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                        },
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                        <HomeRounded />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Dashboard" />}
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/account/new-payment"
                    selected={isActive("/account/new-payment")}
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&.Mui-selected": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                        },
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                        <AddCardRounded />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Make a payment" />}
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/account/invoices"
                    selected={isActive("/account/invoices", true)}
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&.Mui-selected": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                        },
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                        <ReceiptLongRounded />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Get paid" />}
                </ListItemButton>

                {/* Payments Section */}
                <ListItemButton
                    onClick={handlePaymentsClick}
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                        <Payments />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Payments" />}
                    {!collapsed && (paymentsOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                <Collapse in={paymentsOpen && !collapsed} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/account/payments/authorise"
                            selected={isActive("/account/payments/authorise")}
                            sx={{
                                pl: 7, // Indent sub-items
                                borderRadius: 1,
                                mb: 0.5,
                                "&.Mui-selected": {
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                                },
                                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Box component="span" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        Review & authorise
                                        <Badge badgeContent={1} color="error" sx={{ mr: 1 }} />
                                    </Box>
                                }
                            />
                        </ListItemButton>
                        <ListItemButton
                            component={Link}
                            to="/account/payments/scheduled"
                            selected={isActive("/account/payments/scheduled")}
                            sx={{
                                pl: 7,
                                borderRadius: 1,
                                mb: 0.5,
                                "&.Mui-selected": {
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                                },
                                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                            }}
                        >
                            <ListItemText primary="Scheduled" />
                        </ListItemButton>
                        <ListItemButton
                            component={Link}
                            to="/account/payments/history"
                            selected={isActive("/account/payments/history")}
                            sx={{
                                pl: 7,
                                borderRadius: 1,
                                mb: 0.5,
                                "&.Mui-selected": {
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                                },
                                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                            }}
                        >
                            <ListItemText primary="Transactions" />
                        </ListItemButton>
                        <ListItemButton
                            component={Link}
                            to="/account/invoices/incoming"
                            selected={isActive("/account/invoices/incoming")}
                            sx={{
                                pl: 7,
                                borderRadius: 1,
                                mb: 0.5,
                                "&.Mui-selected": {
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                                },
                                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                            }}
                        >
                            <ListItemText primary="Incoming transactions" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton
                    component={Link}
                    to="/account/payees"
                    selected={isActive("/account/payees")}
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&.Mui-selected": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                        },
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                        <HowToRegRounded />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Payees" />}
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/account/payment-methods"
                    selected={isActive("/account/payment-methods")}
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&.Mui-selected": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                        },
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                        <AccountBalanceWalletRounded />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Wallet" />}
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/account/settings"
                    selected={isActive("/account/settings")}
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&.Mui-selected": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                        },
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                        <Settings />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Settings" />}
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/account/activity-log"
                    selected={isActive("/account/activity-log")}
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&.Mui-selected": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                        },
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                        <AccessTimeFilled />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Activity log" />}
                </ListItemButton>
            </List>

            {/* Spacer */}
            <Box sx={{ flex: 1 }} />

            {/* Footer */}
            {!collapsed && (
                <Box sx={{ p: 2 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" fontWeight="bold">
                            Ready to redeem your points?
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Click the Rewards button in the top right
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        component={Link}
                        to="/refer"
                        sx={{
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            color: "white",
                            textTransform: "none",
                            justifyContent: "flex-start",
                            p: 1.5,
                            "&:hover": {
                                bgcolor: "rgba(255, 255, 255, 0.2)",
                            },
                        }}
                        startIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M3.44805 6.3396C4.13242 7.65033 5.51992 8.54715 7.12305 8.54715H10.123H10.498V12.2264H1.49805C0.668359 12.2264 -0.00195312 11.5687 -0.00195312 10.7547V7.8113C-0.00195312 6.99726 0.668359 6.3396 1.49805 6.3396H3.44805ZM22.498 12.2264H13.498V8.54715H16.873C18.4762 8.54715 19.8637 7.65033 20.548 6.3396H22.498C23.3277 6.3396 23.998 6.99726 23.998 7.8113V10.7547C23.998 11.5687 23.3277 12.2264 22.498 12.2264ZM1.49805 13.6981H10.498V24H3.74805C2.50586 24 1.49805 23.0112 1.49805 21.7924V13.6981ZM13.498 24V13.6981H22.498V21.7924C22.498 23.0112 21.4902 24 20.248 24H13.498Z" fill="#A0B9E7"></path>
                                <path d="M8.9281 3.61679L10.5594 6.33943H10.4984H10.1234H7.12341C6.08748 6.33943 5.24841 5.5162 5.24841 4.49981C5.24841 3.48342 6.08748 2.66018 7.12341 2.66018H7.22654C7.92498 2.66018 8.57654 3.02351 8.9281 3.61679ZM11.9984 4.38483L10.8687 2.49922C10.1094 1.22988 8.72185 0.452637 7.22654 0.452637H7.12341C4.84529 0.452637 2.99841 2.26467 2.99841 4.49981C2.99841 6.73495 4.84529 8.54698 7.12341 8.54698H10.1234H10.4984V12.2262H13.4984V8.54698H16.8734C19.1515 8.54698 20.9984 6.73495 20.9984 4.49981C20.9984 2.26467 19.1515 0.452637 16.8734 0.452637H16.7703C15.275 0.452637 13.8875 1.22988 13.1281 2.49462L11.9984 4.38483ZM15.0687 3.61679C15.425 3.02351 16.0718 2.66018 16.7703 2.66018H16.8734C17.9094 2.66018 18.7484 3.48342 18.7484 4.49981C18.7484 5.5162 17.9094 6.33943 16.8734 6.33943H13.4375L15.0687 3.61679ZM13.4984 23.9998V13.6979H10.4984V23.9998H13.4984Z" fill="white"></path>
                            </svg>
                        }
                    >
                        Refer and earn
                    </Button>
                </Box>
            )}
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: collapsed ? 80 : 280,
                flexShrink: 0,
                transition: "width 0.2s",
                height: "100%",
            }}
        >
            {content}
        </Box>
    );
};
