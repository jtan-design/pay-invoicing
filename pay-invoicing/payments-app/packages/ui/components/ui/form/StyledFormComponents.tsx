import { styled } from "@mui/material/styles";
import { TextField, Select, FormControl, Button } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    fontFamily: theme.typography.fontFamily,
    fontSize: "16px",
    height: "56px",
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: theme.typography.fontFamily,
    fontSize: "14px",
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 16px",
    "&::placeholder": {
      color: theme.palette.text.disabled,
      opacity: 1,
    },
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: "56px",
  fontFamily: theme.typography.fontFamily,
  fontSize: "16px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.light,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .MuiSelect-select": {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    fontFamily: theme.typography.fontFamily,
    fontSize: "14px",
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  height: "40px",
  fontFamily: theme.typography.fontFamily,
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "0.8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&:disabled": {
    backgroundColor: theme.palette.text.disabled,
    color: theme.palette.background.paper,
  },
})); 