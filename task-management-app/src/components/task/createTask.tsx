import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import Style from "../../common/styles/style";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CreateTask = () => {
    return (
        <Container maxWidth="lg" >
            <div style={Style.paper}>
                <Typography component="h1" variant="h5">
                    Detalle Tarea
                </Typography>
            </div>
            {/* Contenedor Blanco */}
            <form style={Style.form}>
                <Grid container spacing={2}>
                    {/* Contenedor de la Izquierda */}
                    <Grid item xs={8}>
                        <Grid container spacing={2}>
                            {/* Contenedor Rojo: Description */}
                            <Grid item xs={12} md={12}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel-red-content"
                                        id="panel-red-header"
                                    >
                                        <Typography>Información general</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            fullWidth
                                            label="Nombre"
                                            variant="outlined"
                                            name="name"
                                            value={1}
                                            onChange={() => { }}
                                            sx={{ marginBottom: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Apellido"
                                            variant="outlined"
                                            name="surname"
                                            multiline
                                            rows={4}
                                            value={1}
                                            onChange={() => { }}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            {/* Contenedor Azul: Acceptance Criteria */}
                            <Grid item xs={12} md={12}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel-red-content"
                                        id="panel-red-header"
                                    >
                                        <Typography>Asignación</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            fullWidth
                                            label="Nombre"
                                            variant="outlined"
                                            name="name"
                                            value={1}
                                            onChange={() => { }}
                                            sx={{ marginBottom: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Apellido"
                                            variant="outlined"
                                            name="surname"
                                            value={1}
                                            onChange={() => { }}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel-red-content"
                                        id="panel-red-header"
                                    >
                                        <Typography>Comentarios/Discución</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            fullWidth
                                            label="Apellido"
                                            variant="outlined"
                                            name="surname"
                                            rows={4}
                                            multiline
                                            value={1}
                                            onChange={() => { }}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sx={{ padding: 2 }}>
                            <Grid item xs={12} md={12}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel-red-content"
                                        id="panel-red-header"
                                    >
                                        <Typography>Planeación</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            fullWidth
                                            label="Nombre"
                                            variant="outlined"
                                            name="name"
                                            value={1}
                                            onChange={() => { }}
                                            sx={{ marginBottom: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Apellido"
                                            variant="outlined"
                                            name="surname"
                                            multiline
                                            rows={4}
                                            value={1}
                                            onChange={() => { }}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                    </Grid>

                </Grid>
                <Grid justifyContent="center">
                    <Grid item xs={12} md={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            style={Style.submit}
                            onClick={() => {}}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default CreateTask;