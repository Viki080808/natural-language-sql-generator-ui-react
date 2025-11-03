import {DataGrid} from "@mui/x-data-grid";

export default function DataTable({ columns, rows}) {
    return (
        <div className="DataTableDiv" style={{ height: "100%", width: "100%", '--DataGrid-t-header-background-base': '#0d0c0d !important' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50, 100]}
                disableSelectionOnClick
                sx={{ width:'100%',
                    height:700,
                    borderRadius: 3,
                    // '--DataGrid-t-header-background-base': '#0d0c0d',
                    // header styles
                    // "& .MuiDataGrid-columnHeaders": {
                    //     backgroundColor: 'var(--DataGrid-t-header-background-base) !important',
                    //     color: "#ffffff",
                    //     fontWeight: 700,
                    //     fontSize: "0.95rem",
                    //     lineHeight: "1.5",
                    //     borderTopLeftRadius: 12,
                    //     borderTopRightRadius: 12,
                    //     boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.04)"
                    // },
                    // "& .MuiDataGrid-columnHeader": {
                    //     "&:hover": { backgroundColor: "transparent" },   
                    //     display: "flex",
                    //     alignItems: "center"
                    // },
                    // "& .MuiDataGrid-columnHeaderTitle": {
                    //     whiteSpace: "nowrap",
                    //     overflow: "hidden",
                    //     textOverflow: "ellipsis"
                    // },
                    // "& .MuiDataGrid-columnSeparator": {
                    //     display: "none"
                    // },
                    // "& .MuiDataGrid-iconSeparator, & .MuiDataGrid-sortIcon": {
                    //     color: "rgba(255,255,255,0.8)"
                    // }
                }}
            />
        </div>
    );
}