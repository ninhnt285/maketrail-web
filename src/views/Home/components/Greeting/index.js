import React from 'react';

import { Grid, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import { TiPencil, TiWeatherPartlySunny, TiMap, TiGlobeOutline, TiMessages, TiHomeOutline, TiCalculator } from 'react-icons/lib/ti';
import coverImage from 'assets/bg1.jpg';
import svgMap from 'assets/map.png';

import styles from './Greeting.scss';

export default class GreetingComponent extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.topContent}>
          <div className={styles.innerBg}>
            <Grid>
              <Row className='show-grid'>
                <Col sm={7} className={styles.text}>
                  <h1 className={styles.slogan}>Make the best plan for your next trip</h1>
                  <p className={styles.description}>
                    Using AI with over 50,000 places database to help you and your friends making easily the next trip.
                  </p>
                </Col>
                <Col sm={5}>
                  <div className={styles.formTop}>
                    <div className={styles.formTopLeft}>
                      <h3>Sign up now</h3>
                      <p>Fill in the form below to get instant access:</p>
                    </div>
                    <div className={styles.formTopRight}>
                      <TiPencil size={70} color='#eee' />
                    </div>
                  </div>

                  <div className={styles.formBottom}>
                    <form>
                      <FormGroup controlId='fullname'>
                        <FormControl
                          id='fullname'
                          type='text'
                          placeholder='Full Name'
                        />
                      </FormGroup>
                      <FormGroup controlId='username'>
                        <FormControl
                          id='username'
                          type='text'
                          placeholder='Username'
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControl
                          id='email'
                          type='email'
                          placeholder='Your Email'
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControl
                          id='password'
                          type='password'
                          placeholder='Password'
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button className={styles.submitBtn} bsStyle='info'>Submit</Button>
                      </FormGroup>
                    </form>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
          <div className={styles.backstretch}>
            <img className={styles.coverImage} src={coverImage} alt='MakeTrail' />
          </div>
        </div>

        <div className={`${styles.tripMaker} ${styles.featureSection}`}>
          <Grid>
            <Row>
              <Col className={styles.title} sm={12}>
                <h2>Trip Maker</h2>
                <span className={styles.divider} />
              </Col>
            </Row>
            <Row>
              <Col sm={4} className={styles.featureBox}>
                <TiMap className={styles.featureBoxIcon} />
                <h3>Itinerary Preview</h3>
                <p>See your journey in visual map and show you the rest places, gas stations, etc.</p>
              </Col>
              <Col sm={4} className={`${styles.featureBox} ${styles.featureBoxGrey}`}>
                <TiGlobeOutline className={styles.featureBoxIcon} />
                <h3>Suggest System</h3>
                <p>With over 50K database of cities, places, restaurants and tours, you can find anywhere you want to go.</p>
              </Col>
              <Col sm={4} className={styles.featureBox}>
                <TiHomeOutline className={styles.featureBoxIcon} />
                <h3>Book Hotels</h3>
                <p>We find the best hotels with reasonable price and show them to your screen.</p>
              </Col>
            </Row>
            <Row>
              <Col sm={4} className={`${styles.featureBox} ${styles.featureBoxGrey}`}>
                <TiWeatherPartlySunny className={styles.featureBoxIcon} />
                <h3>Weather Forecast</h3>
                <p>See the historical weather to forecast all cities in your trip.</p>
              </Col>
              <Col sm={4} className={styles.featureBox}>
                <TiMessages className={styles.featureBoxIcon} />
                <h3>Team Discuss</h3>
                <p>Chatting with your friends in realtime to make a plan.</p>
              </Col>
              <Col sm={4} className={`${styles.featureBox} ${styles.featureBoxGrey}`}>
                <TiCalculator className={styles.featureBoxIcon} />
                <h3>Estimate Cost</h3>
                <p>Estimate total cost of next trip for you and your friends.</p>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className={`${styles.exportVideo} ${styles.featureSection}`}>
          <Grid>
            <Row>
              <Col className={styles.title} sm={12}>
                <h2>Trip Video Exporting</h2>
                <span className={styles.divider} />
              </Col>
            </Row>
            <Row>
              <Col sm={5}>
                <div className={styles.videoContainer}>
                  <iframe width='1280' height='720' src='https://www.youtube.com/embed/3lx9n19PfE0?rel=0&amp;controls=0&amp;showinfo=0' frameBorder='0' allowFullScreen />
                </div>
              </Col>
              <Col sm={7} className={styles.description}>
                <p>• Auto create a beautiful video from your media that you captured in your trip.</p>
                <p>• Over 5 video templates to choose for exporting.</p>
                <p>• Share this video to your friends easily in your home page or other sites like FaceBook, Twitter, Instagram, etc</p>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className={`${styles.exportMap} ${styles.featureSection}`}>
          <Grid>
            <Row>
              <Col className={styles.title} sm={12}>
                <h2>Your visited map</h2>
                <span className={styles.divider} />
              </Col>
            </Row>
            <Row>
              <Col sm={7} className={styles.description}>
                <p>• Check-in your visited places and countries by map.</p>
                <p>• Share and beat your friends to win many free travel prize in MakeTrail.</p>
              </Col>
              <Col sm={5}>
                <div className={styles.svgMap}>
                  <img src={svgMap} alt='Visited Countries Map' />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
