import React, { useState } from "react";

import PageContainer from "../components/PageContainer";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  Stack,
  Typography,
  InputAdornment,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "@mui/icons-material";
import { logout } from "../reducer/authSlice";
import KYCModal from "../components/KYCModal";
import { deactivateAccount } from "../api/settingsApi";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const profileUrl = user.profileUrl;
  const [kycModal,setKycModal]=useState(false)

  const deactivated=()=>{
    deactivateAccount((data)=>dispatch(logout()),(error)=>console.error(error))
  }
  return (
    <PageContainer>
      <Typography
        color="info"
        variant="h6"
        sx={{ fontWeight: "bold", mb: 0.5 }}
      >
        Account Settings
      </Typography>
      <Typography variant="body2" sx={{ color: "gray", mb: 3 }}>
        Manage your personal information and settings
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "50%" },

            borderRadius: 1,

            p: 2,
          }}
        >
          <Stack spacing={1} alignItems="center">
            <Avatar
              src={profileUrl}
              alt="Profile"
              className="rounded-full"
              sx={{ width: 80, height: 80 }}
            />
            <Typography
              variant="subtitle1"
              color="info"
              sx={{ fontWeight: "bold" }}
            >
              {user.firstName} {user.middleName} {user.lastName}
            </Typography>
            <Typography variant="caption" color="info">
              KYC Status:{" "}
              <span style={{ color: "orange" }}>{user.kycStatus}</span>
            </Typography>

            {user.kycStatus === "PENDING" && (
              <Button size="samll" color="secondary" onClick={()=>setKycModal(true)}>
                Update KYC
              </Button>
            )}
          </Stack>

          <Divider sx={{ my: 2, color: "info.main" }}>
            Personal Information
          </Divider>

          <Stack spacing={1.5}>
            <FormControl size="small" fullWidth>
              <OutlinedInput
                value={`${user.firstName} ${user.middleName} ${user.lastName}`}
                readOnly
                placeholder="Full Name"
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" sx={{ color: "gray" }} />
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl size="small" fullWidth>
              <OutlinedInput
                value={user.email}
                readOnly
                placeholder="Email"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" sx={{ color: "gray" }} />
                  </InputAdornment>
                }
              />
            </FormControl>

          
          </Stack>
          <Button
            onClick={() => dispatch(logout())}
            startIcon={<Logout />}
            color="error"
            size="small"
            variant="contained"
            sx={{
              mt: 1,
            }}
          >
            Logout
          </Button>
        </Box>

        <Box
          sx={{
            flexBasis: { xs: "100%", md: "50%" },

            borderRadius: 1,

            p: 2,
          }}
        >
          <Box
            sx={{
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography
              color="info"
              variant="body1"
              sx={{ fontWeight: "bold", color: "fuchsia.700", mb: 1 }}
            >
              Deactivate Account
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Deactivating your account will hide your profile and activity from
              others. You can reactivate your account by logging back in.
            </Typography>

            <List dense sx={{ mb: 2, pl: 2 }}>
              <ListItem sx={{ display: "list-item", p: 0 }}>
                <ListItemText
                  primary="Your data will be retained but hidden."
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
              <ListItem sx={{ display: "list-item", p: 0 }}>
                <ListItemText
                  primary="You won't receive notifications."
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
              <ListItem sx={{ display: "list-item", p: 0 }}>
                <ListItemText
                  primary="You can reactivate at any time."
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
            </List>

            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              If you're sure, click below to begin the deactivation process.
            </Typography>

            <Button
            onClick={()=>deactivated()}
              size="small"
              sx={{
                p: 0,
                color: "error.main",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
              }}
            >
              I want to deactivate my account
            </Button>
          </Box>
        </Box>
      </Box>
      {kycModal&&<KYCModal open={kycModal} setOpen={setKycModal}/>}
    </PageContainer>
  );
};

export default Settings;
