# Tube Status Map
Renders an SVG map of the Tube, Overground, and DLR lines and (primitively) animates each line with its status.

## Logic
Using the [TfL Status API](https://api.tfl.gov.uk/line/mode/tube/status), a ranking (No disruption, Minor disruption,
Major disruption) is calculated for all lines and conditional styles are applied to animate them.

The ranking for the whole line is determined by the highest severity level of disruption on that line. This means if a
line is part suspended between two adjacent stations, the whole line is considered to have a major disruption.

This obviously isn't ideal but serves as a basic example for now. Please don't use it to plan your commute.

## Todo

- Allow toggling line statuses for demonstration.
- Integrate statuses between stations, instead of applying them to the whole line.
- Test. The logic is pretty straightforward, so any tests would just duplicate the code logic.
- Poll the API.
