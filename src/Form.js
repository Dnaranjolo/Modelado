import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "90%",
    },
    button: {
        margin: theme.spacing.unit,
        width: "100%",
    },
});

class Form extends PureComponent {

    state = {};
    onChange = async ({ target: { id, value } }) => {
        await this.setState({ [id]: id === "formula" || id === "h" || !value? value : parseInt(value) });
        const { t0, n, h, tf } = this.state;
        if (id==="n" && n){
             if (tf) this.setState({ h: (t0 + tf)/n });
        }
        else if (id==="h" && h){
            if (tf) this.setState({ n: (tf - t0)/parseFloat(h) });
            else if (n) this.setState({ tf: parseInt(t0 + n * parseFloat(h)) });
        }
        else if (id==="t0" && t0 && n && h) this.setState({ tf: parseInt(t0 + n * parseFloat(h)) });
    };

    render() {
        const { classes, onSubmit } = this.props;
        const { n, h, tf } = this.state;
        return (
            <Paper style={{ width: "40%" }} elevation={1}>
                <form className={classes.container} autoComplete="off" onSubmit={e => e.preventDefault() || onSubmit(this.state)}>
                    <Grid container spacing={16}>
                        <Grid item xs={4}>
                            <TextField
                                id="formula"
                                label="f(x,t)"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="t0"
                                label="t0"
                                type="number"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="tf"
                                label="tf"
                                onChange={this.onChange}
                                margin="normal"
                                value={tf}
                                required={!h}
                                className={classes.textField}
                     
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="x0"
                                label="x0"
                                type="number"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="n"
                                label="n"
                                type="number"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                className={classes.textField}
                                required
                                value={n}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="h"
                                label="h"
                                onChange={this.onChange}
                                margin="normal"
                                required
                                value={h}
                                className={classes.textField}
                                required={!tf}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="timeout"
                                label="Intervalo (ms)"
                                onChange={this.onChange}
                                margin="normal"
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={8} />
                            <Grid item xs={3}>
                                <Button variant="contained" color="primary" className={classes.button} type="submit">
                                    OK
                        </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(Form);