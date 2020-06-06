import React from 'react';
import './App.css';

interface PaceCalculatorProps {
}

interface DistanceProps {
  distanceInKm: string;
  onDistanceChanged: (event: string) => void;
}

interface GoalTimeProps {
  goalHours: string;
  goalMinutes: string;
  goalSeconds: string;
  onGoalHoursChange: (event: string) => void;
  onGoalMinutesChange: (event: string) => void;
  onGoalSecondsChange: (event: string) => void;
}

class PaceCalculatorModel
{
  constructor(public goalHours: number, public goalMinutes: number, public goalSeconds: number, public distance: number)
  {
  }
}

function App() {
  return (
    <main>
      <div className="container">
        <h1>Pace Calculator</h1>
        <PaceCalculator></PaceCalculator>
      </div>
    </main>);
}
function calculatePace(model: PaceCalculatorModel) :string {
  const paceInSeconds = calculatePaceInSeconds(model);
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = Math.floor(paceInSeconds % 60);
  var pace = minutes + ":" + seconds.toString().padStart(2, "0");
  return "Pace = " + pace + " /km ";
}

function validate(state: PaceCalculatorState) :PaceCalculatorModel | undefined {
  if(state.goalHours === "" ||  
     state.goalMinutes === "" ||  
     state.goalSeconds === ""  || 
     state.distance === "" )
  {
    return undefined;
  }
  const hours = parseInt(state.goalHours);
  const minutes = parseInt(state.goalMinutes);
  const seconds = parseInt(state.goalSeconds);
  const distance = Number(state.distance);
  if(!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds) && !isNaN(distance))
  {
    return new PaceCalculatorModel(hours, minutes, seconds, distance);
  }
  else
  {
    return undefined;
  }  
}

function calculatePaceInSeconds(model: PaceCalculatorModel) {
  const hoursInSeconds = convertHoursToSeconds(model!.goalHours);
  const minutesInSeconds = convertMinutesToSeconds(model!.goalMinutes);
  const goalTime = hoursInSeconds + minutesInSeconds + model!.goalSeconds;
  const paceInSeconds = goalTime / model!.distance;
  return paceInSeconds;
}

function convertHoursToSeconds(hours: number):number {
  return (hours * 60 * 60);
}

function convertMinutesToSeconds(minutes: number) {
  return minutes * 60;
}

interface PaceCalculatorState {
  distance: string;
  goalHours: string;
  goalMinutes: string;
  goalSeconds: string;
}

class PaceCalculator extends React.Component<PaceCalculatorProps, PaceCalculatorState> {
  constructor(props: PaceCalculatorProps) {
    super(props);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleGoalHoursChange = this.handleGoalHoursChange.bind(this);
    this.handleGoalMinutesChange = this.handleGoalMinutesChange.bind(this);
    this.handleGoalSecondsChange = this.handleGoalSecondsChange.bind(this);
    this.state = { distance: '', goalHours: '', goalMinutes: '', goalSeconds: '' };
  }

  handleDistanceChange(distance: string) {
    this.setState({ distance });
  }

  handleGoalHoursChange(goalHours: string) {
    this.setState({ goalHours });
  }

  handleGoalMinutesChange(goalMinutes: string) {
    this.setState({ goalMinutes });
  }

  handleGoalSecondsChange(goalSeconds: string) {
    this.setState({ goalSeconds });
  }

  render() {
    const distance = this.state.distance;
    const goalHours = this.state.goalHours;
    const goalMinutes = this.state.goalMinutes;
    const goalSeconds = this.state.goalSeconds;
    const model = validate(this.state);
    const pace = model !== undefined ? calculatePace(model) : "";
    return (
      <>
        <GoalTime
          goalHours={goalHours} onGoalHoursChange={this.handleGoalHoursChange}
          goalMinutes={goalMinutes} onGoalMinutesChange={this.handleGoalMinutesChange}
          goalSeconds={goalSeconds} onGoalSecondsChange={this.handleGoalSecondsChange}></GoalTime>
        <Distance distanceInKm={distance} onDistanceChanged={this.handleDistanceChange}></Distance>
        <h4>
          {pace}
        </h4>
      </>
    );
  }
}

class Distance extends React.Component<DistanceProps> {
  constructor(props: DistanceProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.props.onDistanceChanged(e.target.value);
  }

  render() {
    return (
      <fieldset>
        <label htmlFor="distance">Distance</label>
        <select id="distance" value={this.props.distanceInKm} onChange={this.handleChange}>
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

class GoalTime extends React.Component<GoalTimeProps> {
  constructor(props: GoalTimeProps) {
    super(props);
    this.handleHoursChange = this.handleHoursChange.bind(this);
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleSecondsChange = this.handleSecondsChange.bind(this);
  }

  handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onGoalHoursChange(e.target.value);
  }

  handleMinutesChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onGoalMinutesChange(e.target.value);
  }

  handleSecondsChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onGoalSecondsChange(e.target.value);
  }

  render() {
    return (
      <fieldset>
        <label>Goal Time</label>
        <input type="number" placeholder="hours" value={this.props.goalHours} onChange={this.handleHoursChange} className="Timespan" />&nbsp;:&nbsp;
        <input type="number" placeholder="minutes" value={this.props.goalMinutes} onChange={this.handleMinutesChange} className="Timespan" />&nbsp;:&nbsp;
        <input type="number" placeholder="seconds" value={this.props.goalSeconds} onChange={this.handleSecondsChange} className="Timespan" />
      </fieldset>
    );
  }
}

export default App;