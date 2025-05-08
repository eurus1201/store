import { Grid, Typography } from "@mui/material"

const Footer = () => {
    return (<Grid container spacing={2} sx={{
        position: "fixed",
        bottom: 0, 
        width: '100%', 
        padding: "16px 0", 
        marginTop: "auto", 
        textAlign: "center", 
        backgroundColor: "primary.main", 
        color: "white"
    }}>

        <Typography width={"100%"} >
            &copy; {new Date().getFullYear()} STORE. All rights reserved.
        </Typography>

    </Grid>)
}
export default Footer;