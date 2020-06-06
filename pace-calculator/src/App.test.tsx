import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, getByTitle, getByLabelText, fireEvent, getByPlaceholderText } from '@testing-library/react';
import App from './App';
//import userEvent from "@testing-library/user-event";

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('renders Pace Calculator heading', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Pace Calculator');
  expect(linkElement).toBeInTheDocument();
});

test('renders Goal Time label', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Goal Time');
  expect(linkElement).toBeInTheDocument();
});

test('renders Distance label', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Distance');
  expect(linkElement).toBeInTheDocument();
});

test('calculates my marathon PB', async () => {
  assertMarathonPaceCalculation(3, 45, 4, 'Pace = 5:20 /km');
});

test('calculates 3 Hour marathon', async () => {
  assertMarathonPaceCalculation(3, 0, 0, 'Pace = 4:15 /km');
});

test('calculates Eliud Kipchoge sub 2 hour marathon', async () => {
  assertMarathonPaceCalculation(1, 59, 40, 'Pace = 2:50 /km');
});

test('seconds has a leading zero', async () => {
  assertMarathonPaceCalculation(3, 33, 3, 'Pace = 5:02 /km');
});

function assertMarathonPaceCalculation(hours: number, minutes: number, seconds: number, expectedResult: string) {
  const { getByText, getByTestId, getByPlaceholderText } = render(<App />);
  //TODO:figure out how to set select value, so UI doesn't have to default value
  //await selectEvent.select(getByText('Distance'), 'Marathon');
  //userEvent.selectOptions(getByTestId("mara"), ["42.195"]);
  // expect(screen.getByTestId("mara").selected).toBe(true);
  fireEvent.change(getByPlaceholderText('hours'), {
    target: { value: hours },
  });
  fireEvent.change(getByPlaceholderText('minutes'), {
    target: { value: minutes },
  });
  fireEvent.change(getByPlaceholderText('seconds'), {
    target: { value: seconds },
  });

  const linkElement = getByText(expectedResult);//note: for the test to pass, the distance state property must be set to 42.195
  expect(linkElement).toBeInTheDocument();
}
