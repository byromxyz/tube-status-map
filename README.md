This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Tube Status Map

## Hi
This map renders an SVG map of the Tube, Overground, and DLR lines and shows animates each line with a primitive status

## Logic
Using the [TfL Status API](https://api.tfl.gov.uk/line/mode/tube/status), a ranking (No disruption, minor disruption,
major disruption) is calculated for all lines and conditional styles are applied to animate them.l

The ranking for the line is determined by the highest severity level of disruption on that line.  This means if a line
is part suspended between two adjacent stations, the whole line is considered to have a major disruption.

This obviously isn't ideal but serves as a basic example for now. Please don't use it to plan your commute.
