import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FullScreenDialog from '../Components/Dialog/FullScreenDialog';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardRoot: {
        maxWidth: 345,
    },
    paper: {
        height: 140,
        width: 100,
    },
    media: {
        height: 500,
    },
    control: {
        padding: theme.spacing(2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SpacingGrid() {
    const [spacing, setSpacing] = useState(2);
    const classes = useStyles();

    const botList = [
        {
            nama: "Kang Kebon",
            headerText: "Cara pake bot:",
            desc1: "- Download tampermonkey extension dari google dan install.",
            desc2: "- Buka link https://github.com/fakhripraya/KangKebon/raw/main/monyet-pengganggu-pvu.user.js",
            desc3: "- Klik install di tamper monkey",
            desc4: "- Sekarang harusnya sudah autoload, kalau belum ke load di refresh aja page plotnya",
            desc5: "- Script pakai salah 1 saja, jika dienable 2 script akan error",
            desc6: "- Jika ingin ganti maksimal level air, bisa ganti angka disebelah var maxWater di line kode 1",
            desc7: "- Have fun",
            img: "https://www.freepnglogos.com/uploads/farmer-png/farmer-shipahn-luis-deviantart-29.png",
            id: 0,
            link: "https://github.com/fakhripraya/KangKebon/raw/main/monyet-pengganggu-pvu.user.js"
        },
        {
            nama: "Kang Gagak",
            headerText: "Cara pake bot:",
            desc1: "- Download tampermonkey extension dari google dan install.",
            desc2: "- Buka link https://github.com/fakhripraya/KangKebon/raw/main/monyet-pengganggu-pvu-gagak.user.js",
            desc3: "- Klik install di tamper monkey",
            desc4: "- Sekarang harusnya sudah autoload, kalau belum ke load di refresh aja page plotnya",
            desc5: "- Script pakai salah 1 saja, jika dienable 2 script akan error",
            desc6: "- Jika ingin ganti maksimal level air, bisa ganti angka disebelah var maxWater di line kode 1",
            desc7: "- Have fun",
            img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/676901b4-3208-4d9c-8990-042b114be3b1/de7n35w-ca998e95-1b35-458f-a7e2-bfddf3363ed2.png/v1/fill/w_850,h_940,strp/crow_64_catastrophe_crow_by_c4stl3_cr4sh3rs_de7n35w-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI5MCIsInBhdGgiOiJcL2ZcLzY3NjkwMWI0LTMyMDgtNGQ5Yy04OTkwLTA0MmIxMTRiZTNiMVwvZGU3bjM1dy1jYTk5OGU5NS0xYjM1LTQ1OGYtYTdlMi1iZmRkZjMzNjNlZDIucG5nIiwid2lkdGgiOiI8PTExNjcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ._E3wdPwe4aU0lkuhdwFHHmdlRfhFUkxCtgqXB0FK228",
            id: 1,
            link: "https://github.com/fakhripraya/KangKebon/raw/main/monyet-pengganggu-pvu-gagak.user.js"
        },
        {
            nama: "Kang Kebon Bergagak",
            headerText: "Cara pake bot:",
            desc1: "- Download tampermonkey extension dari google dan install.",
            desc2: "- Buka link https://github.com/fakhripraya/KangKebon/raw/main/monyet-pengganggu-pvu-kebon-gagak.user.js",
            desc3: "- Klik install di tamper monkey",
            desc4: "- Sekarang harusnya sudah autoload, kalau belum ke load di refresh aja page plotnya",
            desc5: "- Script pakai salah 1 saja, jika dienable 2 script akan error",
            desc6: "- Jika ingin ganti maksimal level air, bisa ganti angka disebelah var maxWater di line kode 1",
            desc7: "- Have fun",
            img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f6aa8c0b-c935-4d69-93ce-e7215cc5da1f/ddya2n2-bf43e176-3195-4ef7-bd26-df6cee65826c.png/v1/fill/w_1024,h_1730,q_80,strp/bday___crow_and_farmer_by_luigistar445_ddya2n2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTczMCIsInBhdGgiOiJcL2ZcL2Y2YWE4YzBiLWM5MzUtNGQ2OS05M2NlLWU3MjE1Y2M1ZGExZlwvZGR5YTJuMi1iZjQzZTE3Ni0zMTk1LTRlZjctYmQyNi1kZjZjZWU2NTgyNmMucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.CgwTGxvu8UjO_JFi1dBDP_rysEH_afdZPsI9h-cDpZw",
            id: 2,
            link: "https://github.com/fakhripraya/KangKebon/raw/main/monyet-pengganggu-pvu-kebon-gagak.user.js"
        },
    ]

    return (
        <Box component="span" m={1}>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={spacing}>
                        {botList.map((value, index) => (
                            <Grid key={index} item>
                                <Card className={classes.cardRoot}>
                                    <CardMedia
                                        className={classes.media}
                                        image={value.img}
                                        title={value.nama}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <span style={{ color: "#58BD0C" }}>{value.nama}</span>
                                        </Typography>
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            {value.headerText}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.desc1}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.desc2}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.desc3}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.desc4}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.desc5}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.desc6}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.desc7}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button href={value.link} variant="contained" color="primary">
                                            Install / Update
                                        </Button>
                                        <FullScreenDialog id={value.id} />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
