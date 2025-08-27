import React, { useState } from 'react';
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
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import PageHeading from '../components/PageHeading';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';

const documentTypes = [
  'Passport',
  'National ID',
  'Driver’s License',
  'Voter ID',
  'PAN Card',
];

const KYCSubmission = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <PageContainer>
      <Stack
        sx={{
       
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box 
          sx={{ 
            width: '100%',
            maxWidth: 500, 
          }}
        >
          <Card elevation={3}>
            <CardContent>
              <PageHeading header={'Complete Your KYC'} />
              <Typography variant="caption" color="text.secondary">
                To comply with regulatory requirements, we need to verify your identity. Please provide the following details.
              </Typography>

              <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Typography variant="body2" color='info' sx={{ fontWeight: 'bold' }}>First Name</Typography>
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
                    <Typography variant="body2" color='info' sx={{ fontWeight: 'bold' }}>Middle Name</Typography>
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
                    <Typography variant="body2" color='info' sx={{ fontWeight: 'bold' }}>Last Name</Typography>
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

                  <Stack spacing={1}>
                    <Typography variant="body2" color='info' sx={{ fontWeight: 'bold' }}>Document Type</Typography>
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

                  <Stack spacing={1}>
                    <Typography variant="body2" color='info' sx={{ fontWeight: 'bold' }}>Document Number</Typography>
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

                  <Stack direction="row" justifyContent="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size='small'
                      sx={{ mt: 2 }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </PageContainer>
  );
};

export default KYCSubmission;
