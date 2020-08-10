import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({ data: { TotalConfirmed, TotalRecovered, TotalDeaths }, country}) => {
    const activeCases = TotalConfirmed - TotalRecovered - TotalDeaths;
    const closedCases = TotalRecovered + TotalDeaths;
    return (
        !TotalConfirmed && TotalConfirmed !== 0 ? <h1>Loading...</h1> : TotalConfirmed === 0 ? <h1>{`No confirmed cases in ${country}`}</h1> :(
            <div className={styles.container}>
                <Box mb={4}>
                    <Grid container spacing={3} justify="center">
                        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>Infected</Typography>
                                <Typography varaint="h5">
                                    <CountUp start={0} end={TotalConfirmed} separator=","/>
                                </Typography>
                                <Typography varaint="body2">Number of confirmed cases of COVID-19</Typography>
                            </CardContent>
                        </Grid>
                        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                                <Typography varaint="h5">
                                    <CountUp start={0} end={TotalRecovered} separator=","/>
                                </Typography>
                                <Typography varaint="body2">Number of recoveries from COVID-19</Typography>
                            </CardContent>
                        </Grid>
                        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                                <Typography varaint="h5">
                                    <CountUp start={0} end={TotalDeaths} separator=","/>
                                </Typography>
                                <Typography varaint="body2">Number of deaths caused by COVID-19</Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Box>
                <Box mb={4}>
                <Grid container spacing={3} justify="center">
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.info)}>
                        <CardContent>
                            <Typography gutterBottom className={styles.centeredText}>ACTIVE CASES</Typography>
                            <Typography varaint="h5" className={styles.centeredText}>
                                <CountUp start={0} end={activeCases} separator=","/>
                            </Typography>
                            <Typography varaint="body2" color="textSecondary" className={styles.centeredText}>Currently Infected Patients</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.info)}>
                        <CardContent>
                            <Typography gutterBottom className={styles.centeredText}>CLOSED CASES</Typography>
                            <Typography varaint="h5" className={styles.centeredText}>
                                <CountUp start={0} end={closedCases} separator=","/>
                            </Typography>
                            <Typography varaint="body2" color="textSecondary" className={styles.centeredText}>Cases which had an outcome:</Typography>
                            <Grid container justify="center">
                                <Grid item xs={6}>
                                    <Typography varaint="h5" className={styles.centeredText}>
                                        <CountUp 
                                            start={0} 
                                            end={TotalRecovered} 
                                            separator="," 
                                            suffix={` (${Number(((TotalRecovered / closedCases) * 100).toFixed(1))})%`}
                                        />
                                    </Typography>
                                    <Typography varaint="body2" className={styles.centeredText}>Recovered</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography varaint="h5" className={styles.centeredText}>
                                        <CountUp 
                                            start={0} 
                                            end={TotalDeaths} 
                                            separator="," 
                                            suffix={` (${Number(((TotalDeaths / closedCases) * 100).toFixed(1))})%`}
                                        />
                                    </Typography>
                                    <Typography varaint="body2" className={styles.centeredText}>Deaths</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
                </Box>
            </div>
        )
    )
}

export default Cards;