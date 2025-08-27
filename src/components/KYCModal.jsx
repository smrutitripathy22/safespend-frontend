import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  MenuItem,
  InputAdornment,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import PageContainer from "../components/PageContainer";
import PageHeading from "../components/PageHeading";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { kycUpload } from "../api/settingsApi";
import { setUser } from "../reducer/authSlice";


const documentTypes = [
  "Passport",
  "Adhaar Card",
  "Driver’s License",
  "Voter ID",
  "PAN Card",
];

const KYCModal = ({open,setOpen}) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch=useDispatch();
    const [loaderCount, setLoaderCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState({ open: false, msg: "",type:"" });

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    documentType: "",
    documentNumber: "",
    documentFile: null, 
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "documentFile") {
      setFormData((prev) => ({
        ...prev,
        documentFile: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();

  const form = new FormData();


  const jsonBlob = new Blob([JSON.stringify({
    documentType: formData.documentType,
    documentNumber: formData.documentNumber,
    dateOfBirth: formData.dateOfBirth,
  })], { type: "application/json" });

  form.append("kycData", jsonBlob);        
  form.append("documentFile", formData.documentFile);
    setLoaderCount((ps) => ps + 1);
    kycUpload(form,(data)=>
      {
        setErrorMsg({open:true,msg:"KYC Request Submitted",type:"success"});
        setLoaderCount((ps) => ps - 1);
        dispatch(setUser(data));
        setTimeout(()=>setOpen(false),2000)
      },(error)=>{
      setLoaderCount((ps) => ps - 1);
      setErrorMsg({open:true,msg:error,type:"error"})
      })
  };

  return (
    <Dialog open={open} onClose={()=>setOpen(false)}>
   
      {errorMsg.open && (
        <CustomAlert
          open={errorMsg.open}
          type={errorMsg.type}
          message={errorMsg.msg}
          onClose={() => setErrorMsg({ open: false, msg: "",type:"" })}
        />
      )}
      <DialogTitle>Complete Your KYC</DialogTitle>
      <DialogContent dividers>
        <Typography variant="caption" color="text.secondary">
          To comply with regulatory requirements, we need to verify your
          identity. Please provide the following details.
        </Typography>

        <form onSubmit={handleSubmit} style={{ marginTop: 0 }}>
          <Stack spacing={2}>
            {/* Name Fields */}
            <Stack spacing={1}>
              <Typography
                variant="body2"
                color="info"
                sx={{ fontWeight: "bold" }}
              >
                First Name
              </Typography>
              <TextField
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                size="small"
                placeholder="First Name"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography
                variant="body2"
                color="info"
                sx={{ fontWeight: "bold" }}
              >
                Middle Name
              </Typography>
              <TextField
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                size="small"
                placeholder="Middle Name"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography
                variant="body2"
                color="info"
                sx={{ fontWeight: "bold" }}
              >
                Last Name
              </Typography>
              <TextField
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                size="small"
                placeholder="Last Name"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* Document Type */}
            <Stack spacing={1}>
              <Typography
                variant="body2"
                color="info"
                sx={{ fontWeight: "bold" }}
              >
                Document Type
              </Typography>
              <TextField
                select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                size="small"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              >
                {documentTypes.map((doc) => (
                  <MenuItem key={doc} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* Document Number */}
            <Stack spacing={1}>
              <Typography
                variant="body2"
                color="info"
                sx={{ fontWeight: "bold" }}
              >
                Document Number
              </Typography>
              <TextField
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                size="small"
                placeholder="Document Number"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* Upload Document */}
            <Stack spacing={1}>
              <Typography
                variant="body2"
                color="info"
                sx={{ fontWeight: "bold" }}
              >
                Upload Document
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
                size="small"
              >
                {formData.documentFile
                  ? formData.documentFile.name
                  : "Choose File"}
                <input
                  type="file"
                  name="documentFile"
                  accept="image/*,.pdf"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: "1px",
                    height: "1px",
                  }}
                  onChange={handleChange}
                  required
                />
              </Button>
            </Stack>

            <Stack direction="row" justifyContent="center">
              <Button
                type="submit"
                disabled={loaderCount!==0}
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 2 }}
              >
              {loaderCount!==0?"Submiting":"Submit"} 
              </Button>
            </Stack>
          </Stack>
        </form>

        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          ** This is just a simulation, do not provide your original identity
          proof
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default KYCModal;
