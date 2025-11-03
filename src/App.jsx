import { Container, Typography, Box, Paper, Grid, List, ListItemButton, ListItem } from '@mui/material'
import { useState } from 'react';
import QueryInput from './components/QueryInput';
import DataTable from './components/DataTable';
import DownloadButtons from './components/DownloadButtons';

function App() {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState('');

  const handleQueryResult = (responseData) => {
    setData(responseData);
    if (responseData?.data) {
      const headers = Object.keys(responseData.data[0]);
      setColumns(headers.map((col) => ({field: col, headerName: col, flex: 1})));
      setRows(responseData.data.map((row, i) => ({id:i, ...row})));
    }
    setRecentQueries(prev => [responseData.prompt, ...prev]);
  };

  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
  }

  return (
    <Container>
      <Paper
        elevation={0}
          sx={{
            position: "fixed",
            background:"#f3f6fb",
            // right: 24,
            // left: 200,
            top: 90,
            height: '100%',
            width: '100%',
            // height: 1050,
            // bottom: 96,
            // width: 360,
            // width:2000, 
            // height: 1050,
            display: "flex",
            flexDirection: "column", 
            overflow: "hidden",
            borderRadius: 2
          }}>
            <Box sx={{ flexGrow:1}}>
              <Grid container spacing={4} align='center'>
                <Grid size={1}></Grid>
                <Grid size={8}>
                  <Typography variant='h3' align='center' sx={{ margin:5 }} gutterBottom>
                    Data Assistance
                  </Typography>
                  <Box sx={{ width: '80%' }}>
                    <QueryInput onResult={handleQueryResult} initialPrompt={selectedQuery} />
                  </Box>
                  {data && (
                    <Box sx={{ 
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 2,
                      mb: 2,
                      overflow:"hidden"
                    }}>
                      <Typography variant='subtitle1' sx={{ mt: 4}} gutterBottom>
                        Showing results for: <strong>{data.prompt}</strong>
                      </Typography>
                      <Box sx={{ mt:2 }}>
                        <DownloadButtons data={rows} />
                      </Box>
                      <DataTable columns={columns} rows={rows} height={500}/>
                    </Box>
                  )}
                </Grid>
                <Grid size={2}>
                  <Grid height={150}>
                  </Grid>
                  <Grid>
                    {data && (
                  <>
                  <Typography variant='h6' gutterBottom>
                      Recently Requested Scenario
                    </Typography>
                  <Box sx={{ height:'auto', minHeight:200, border: 1, borderRadius: 2 }}>
                    <List>
                      {recentQueries.map((q, i) => (

                        <ListItem key={i} disablePadding>
                        <Box sx={{border: 1, borderRadius: 2, margin: 1, width:'100%'}}>
                          <ListItemButton onClick={() => handleSelectQuery(q)}>
                            {q}
                          </ListItemButton>
                        </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  </>
                    

                  )}
                  </Grid>
                </Grid>
                <Grid size={1}></Grid>
              </Grid>
            </Box>
      </Paper>
    </Container>
  )
}

export default App
