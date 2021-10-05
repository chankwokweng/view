import React, { Component } from 'react'

import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import CardContent from '@mui/material/CardContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';

const styles = ((theme) => ({
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
    },
    // toolbar: theme.mixins.toolbar,
    name: {
        // marginLeft: theme.spacing(2),
        flex: 1
    },
    submitButton: {
        display: 'block',
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        top: 14,
        right: 10
    },
    floatingButton: {
        position: 'fixed',
        bottom: 0,
        right: 0
    },
    form: {
        width: '98%',
        marginLeft: 13,
        // marginTop: theme.spacing(3)
    },
    // toolbar: theme.mixins.toolbar,
    // root: {
    //     minWidth: 470
    // },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    pos: {
        marginBottom: 12
    },
    uiProgess: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    dialogeStyle: {
        maxWidth: '50%'
    },
    viewRoot: {
        margin: 0,
        // padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        // right: theme.spacing(1),
        // top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
})
);

const Transition = React.forwardRef(function Transition(props, ref) {
    console.log('client - Transition:ref=',ref)
    return <Slide direction="up" ref={ref} {...props} />;
});

class client extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: '',
            name: '',
            telephone_day: '',
            clientId: '',
            errors: [],
            open: false,
            uiLoading: true,
            buttonType: '',
            viewOpen: false
        };

        // this.deleteClientHandler = this.deleteClientHandler.bind(this);
        this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
        this.handleViewOpen = this.handleViewOpen.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount = () => {
        console.log('client componentDidMount this.props.history=', this.props.history);
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get('/api/clients')
            .then((response) => {
                this.setState({
                    clients: response.data,
                    uiLoading: false
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // deleteClientHandler(data) {
    //     authMiddleWare(this.props.history);
    //     const authToken = localStorage.getItem('AuthToken');
    //     axios.defaults.headers.common = { Authorization: `${authToken}` };
    //     let clientId = data.client.clientId;
    //     axios
    //         .delete(`/api/client/${clientId}`)
    //         .then(() => {
    //             window.location.reload();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    handleEditClickOpen(data) {
        this.setState({
            name: data.client.name,
            telephone_day: data.client.telephone_day,
            clientId: data.client.clientId,
            buttonType: 'Edit',
            open: true
        });
    }

    handleViewOpen(data) {
        this.setState({
            name: data.client.name,
            telephone_day: data.client.telephone_day,
            viewOpen: true
        });
    }

    render() {
        const DialogTitle = withStyles(styles)((props) => {
            const { children, classes, onClose, ...other } = props;
            return (
                <MuiDialogTitle disableTypography className={classes.root} {...other}>
                    <Typography variant="h6">{children}</Typography>
                    {onClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </MuiDialogTitle>
            );
        });

        const DialogContent = withStyles((theme) => ({
            viewRoot: {
                // padding: theme.spacing(2)
            }
        }))(MuiDialogContent);

        dayjs.extend(relativeTime);
        const { classes } = this.props;
        const { open, errors, viewOpen } = this.state;

        const handleClickOpen = () => {
            this.setState({
                clientId: '',
                name: '',
                telephone_day: '',
                buttonType: '',
                open: true
            });
        };

        const handleSubmit = (event) => {
            authMiddleWare(this.props.history);
            event.preventDefault();
            const userClient = {
                name: this.state.name,
                telephone_day: this.state.telephone_day
            };
            let options = {};
            if (this.state.buttonType === 'Edit') {
                options = {
                    url: `/api/client/${this.state.clientId}`,
                    method: 'put',
                    data: userClient
                };
            } else {
                options = {
                    url: '/api/client',
                    method: 'post',
                    data: userClient
                };
            }
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios(options)
                .then(() => {
                    this.setState({ open: false });
                    window.location.reload();
                })
                .catch((error) => {
                    this.setState({ open: true, errors: error.response.data });
                    console.log(error);
                });
        };

        const handleViewClose = () => {
            this.setState({ viewOpen: false });
        };

        // ========== To close the View/Edit of client dialog box ==========
        const handleClose = (event) => {
            this.setState({ open: false });
        };

        if (this.state.uiLoading === true) {
            return (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
                </main>
            );
        } else {
            return (
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <IconButton
                        className={classes.floatingButton}
                        color="primary"
                        aria-label="Add Client"
                        onClick={handleClickOpen}
                    >
                        <AddCircleIcon style={{ fontSize: 60 }} />
                    </IconButton>

                    {/* ========== VIEW & EDIT Client ==========  */}
                    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.name}>
                                    {this.state.buttonType === 'Edit' ? 'Edit Client' : 'Create a new Client'}
                                </Typography>
                                <Button
                                    autoFocus
                                    color="inherit"
                                    onClick={handleSubmit}
                                    className={classes.submitButton}
                                >
                                    {this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
                                </Button>
                            </Toolbar>
                        </AppBar>

                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="clientTitle"
                                        label="Client Title"
                                        name="name"
                                        autoComplete="clientTitle"
                                        helperText={errors.name}
                                        value={this.state.name}
                                        error={errors.name ? true : false}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="telephone_day"
                                        label="Client Details"
                                        name="telephone_day"
                                        autoComplete="telephone_day"
                                        multiline
                                        rows={25}
                                        rowsMax={25}
                                        helperText={errors.telephone_day}
                                        error={errors.telephone_day ? true : false}
                                        onChange={this.handleChange}
                                        value={this.state.telephone_day}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Dialog>

                    {/*========== LIST OF CLIENTS ==========*/}

                    <Grid container spacing={2}>
                        {this.state.clients.map((client) => (
                            <Grid item xs={12} sm={12}>
                                <Card className={classes.root} variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {client.name}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {dayjs(client.createdAt).fromNow()}
                                        </Typography>
                                        <Typography variant="telephone_day" component="p">
                                            {`${client.telephone_day.substring(0, 65)}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => this.handleViewOpen({ client })}>
                                            {' '}
                                            View{' '}
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => this.handleEditClickOpen({ client })}>
                                            Edit
                                        </Button>
                                        {/* <Button size="small" color="primary" onClick={() => this.deleteClientHandler({ client })}>
                                            Delete
                                        </Button> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/*===== When "View" is clicked =====*/}
                    <Dialog
                        onClose={handleViewClose}
                        aria-labelledby="customized-dialog-name"
                        open={viewOpen}
                        fullWidth
                        classes={{ paperFullWidth: classes.dialogeStyle }}
                    >
                        <DialogTitle id="customized-dialog-name" onClose={handleViewClose}>
                            {this.state.name}
                        </DialogTitle>
                        <DialogContent dividers>
                            <TextField
                                fullWidth
                                id="telephone_day"
                                name="telephone_day"
                                readonly
                                value={this.state.telephone_day}
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </main>
            );
        }
    }
}

export default (withStyles(styles)(client));
