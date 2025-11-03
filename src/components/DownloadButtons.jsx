import { useState } from "react";
import {Button, Stack, Menu, MenuItem} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import saveAs from "file-saver";
import * as XLSX from "xlsx";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles('dark', {
          color: 'inherit',
        }),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function DownloadButtons({data}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDownload = (type) => {
        setAnchorEl(null);
        if (!data || data.length === 0) return;

        if (type === "csv" || type === "xlsx") {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

            const ext = type === "csv" ? "csv" : "xlsx";
            XLSX.writeFile(workbook, `data.${ext}`);
            // const wbout = XLSX.write(workbook, {bookType: ext, type: "array"});
            // saveAs(new Blob(wbout), `data.${ext}`);
        } else if (type === "json") {
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
            saveAs(blob, "data.json");
        }
    };

    return (
        <Stack direction="row" spacing={2}>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                style={{ backgroundColor: "#0d0c0d", color: "white" }}
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Export
            </Button>
            <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    sx: {
                    bgcolor: '#e1ebc3ff',         // any CSS color or theme token like 'background.paper' or 'primary.light'
                    color: 'text.primary',
                    boxShadow: 6,
                    }
                }}
            >
                <MenuItem onClick={() => handleDownload("csv")}>CSV</MenuItem>
                <MenuItem onClick={() => handleDownload("xlsx")}>Excel</MenuItem>
                <MenuItem onClick={() => handleDownload("json")}>JSON</MenuItem>
            </StyledMenu>
        </Stack>
    );
}