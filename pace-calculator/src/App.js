import React from 'react';
import './App.css';

function App() {
  return (
    <form role="form">
    <h1>Pace Calculator</h1>
      <PaceCalculator></PaceCalculator>
    </form>);
}

export default App;

function calculatePace(goalHours, goalMinutes, goalSeconds, distance)
{   
    if(isNaN(goalHours) || goalHours === "" ||
      isNaN(goalMinutes) || goalMinutes === "" ||
      isNaN(goalSeconds) || goalSeconds === "" ||
      isNaN(distance) || distance === "")
    {
      return '';
    }
    const paceInSeconds = calculatePaceInSeconds(goalHours, goalMinutes, goalSeconds, distance);
    const minutes = parseInt(paceInSeconds / 60);
    const seconds = parseInt(paceInSeconds % 60);
    var pace = minutes + ":" + seconds;
    return "Pace = " + pace + " /km ";
}

function calculatePaceInSeconds(goalHours, goalMinutes, goalSeconds, distance)
{
  const hoursInSeconds = convertHoursToSeconds(goalHours);
  const minutesInSeconds = convertMinutesToSeconds(goalMinutes);
  const goalTime = hoursInSeconds + minutesInSeconds + parseInt(goalSeconds);
  const paceInSeconds = goalTime / distance;
  return paceInSeconds;
}

function convertHoursToSeconds(hours) {
  return (parseInt(hours) * 60 * 60);
}

function convertMinutesToSeconds(minutes) {
  return parseInt(minutes) * 60;
}

class PaceCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleGoalHoursChange = this.handleGoalHoursChange.bind(this);
    this.handleGoalMinutesChange = this.handleGoalMinutesChange.bind(this);
    this.handleGoalSecondsChange = this.handleGoalSecondsChange.bind(this);
    this.state = {distance: '42.195', goalHours: '', goalMinutes: '', goalSeconds: ''};  }

  handleDistanceChange(distance) {
    this.setState({distance});  
  }

  handleGoalHoursChange(goalHours) {
    this.setState({goalHours});  
  }

  handleGoalMinutesChange(goalMinutes) {
    this.setState({goalMinutes});  
  }

  handleGoalSecondsChange(goalSeconds) {
    this.setState({goalSeconds});  
  }

  render() {
    const distance = this.state.distance;
    const goalHours = this.state.goalHours;
    const goalMinutes = this.state.goalMinutes;
    const goalSeconds = this.state.goalSeconds;
    const pace = calculatePace(goalHours, goalMinutes, goalSeconds, distance); 
    return (
      <>
      <GoalTime 
        goalHours={goalHours} onGoalHoursChange={this.handleGoalHoursChange} 
        goalMinutes={goalMinutes} onGoalMinutesChange={this.handleGoalMinutesChange} 
        goalSeconds={goalSeconds} onGoalSecondsChange={this.handleGoalSecondsChange}></GoalTime>    
      <Distance distanceInKm={distance} onDistanceChanged={this.handleDistanceChange}></Distance>
      <br/>
      <div className="">
        { pace } 
      </div>
      </>
    );
  }
}

class Distance extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) { 
    this.props.onDistanceChanged(e.target.value);
  }

  render() {
    return (
      <fieldset>
        <label htmlFor="distance">Distance</label>
        <select name="distance" value={this.props.distanceInKm} onChange={this.handleChange}>
          <option value=""></option>
          <option value="5.0">5 km</option>
          <option value="10.0">10 km</option>
          <option value="21.0975">Half marathon</option>
          <option value="42.195">Marathon</option>
        </select>
      </fieldset>
    );
  }
}

class GoalTime extends React.Component {
  constructor(props) {
    super(props);
    this.handleHoursChange = this.handleHoursChange.bind(this);
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleSecondsChange = this.handleSecondsChange.bind(this);
  }

  handleHoursChange(e) { 
    this.props.onGoalHoursChange(e.target.value);
  }

  handleMinutesChange(e) { 
    this.props.onGoalMinutesChange(e.target.value);
  }

  handleSecondsChange(e) { 
    this.props.onGoalSecondsChange(e.target.value);
  }

  render() {
    return (
     <fieldset>
        <label>Goal Time</label>
        <input type="number" placeholder="hours" value={this.props.goalHours} onChange={this.handleHoursChange} className="Timespan" /> :
        <input type="number" placeholder="minutes" value={this.props.goalMinutes} onChange={this.handleMinutesChange} className="Timespan" /> :
        <input type="number" placeholder="seconds" value={this.props.goalSeconds} onChange={this.handleSecondsChange} className="Timespan" />
      </fieldset>    
    );
  }
}
