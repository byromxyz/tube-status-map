import React, { useEffect, useState } from 'react';
import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
import axios from 'axios';
// import mapDay from './map-day.svg';
import MapDay from './MapDay';

const flash = keyframes`
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 75;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  svg {
    width: calc(100% - 50px);
    height: calc(100% - 50px);
    margin: 25px;
    font-family: 'HammersmithOne', 'Hammersmith One';
    font-size: 5px;
  }
`;

const severityLevels = {
  SPECIAL_SERVICE: 'Special Service',
  CLOSED: 'Closed',
  SUSPENDED: 'Suspended',
  PART_SUSPENDED: 'Part Suspended',
  PLANNED_CLOSURE: 'Planned Closure',
  PART_CLOSURE: 'Part Closure',
  SEVERE_DELAYS: 'Severe Delays',
  REDUCED_SERVICE: 'Reduced Service',
  BUS_SERVICE: 'Bus Service',
  MINOR_DELAYS: 'Minor Delays',
  GOOD_SERVICE: 'Good Service',
  PART_CLOSED: 'Part Closed',
  EXIT_ONLY: 'Exit Only',
  NO_STEP_FREE_ACCESS: 'No Step Free Access',
  CHANGE_OF_FREQUENCY: 'Change of Frequency',
  DIVERTED: 'Diverted',
  NOT_RUNNING: 'Not Running',
  ISSUES_REPORTED: 'Issues Reported',
  NO_ISSUES: 'No Issues',
  INFORMATION: 'Information',
  SERVICE_CLOSED: 'Service Closed',
  NO_SEVERITY_GIVEN: 'No Severity Given',
}

const simpleSeverities = {
  NONE: 0,
  MINOR: 1,
  MAJOR: 2,
}
  
const severity = severityLevel => {
  switch (severityLevel) {
    case 0:
      return { simpleSeverity: simpleSeverities.MINOR, description: severityLevels.SPECIAL_SERVICE }
    case 1:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.CLOSED }
    case 2:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.SUSPENDED }
    case 3:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.PART_SUSPENDED }
    case 4:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.PLANNED_CLOSURE }
    case 5:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.PART_CLOSURE }
    case 6:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.SEVERE_DELAYS }
    case 7:
      return { simpleSeverity: simpleSeverities.MINOR, description: severityLevels.REDUCED_SERVICE }
    case 8:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.BUS_SERVICE }
    case 9:
      return { simpleSeverity: simpleSeverities.MINOR, description: severityLevels.MINOR_DELAYS }
    case 10:
      return { simpleSeverity: simpleSeverities.NONE, description: severityLevels.GOOD_SERVICE }
    case 11:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.PART_CLOSED }
    case 12:
      return { simpleSeverity: simpleSeverities.MINOR, description: severityLevels.EXIT_ONLY }
    case 13:
      return { simpleSeverity: simpleSeverities.MINOR, description: severityLevels.NO_STEP_FREE_ACCESS }
    case 14:
      return { simpleSeverity: simpleSeverities.MINOR, description: severityLevels.CHANGE_OF_FREQUENCY }
    case 15:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.DIVERTED }
    case 16:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.NOT_RUNNING }
    case 17:
      return { simpleSeverity: simpleSeverities.MINOR, description: severityLevels.ISSUES_REPORTED }
    case 18:
      return { simpleSeverity: simpleSeverities.NONE, description: severityLevels.NO_ISSUES }
    case 19:
      return { simpleSeverity: simpleSeverities.MINOR, description: severityLevels.INFORMATION }
    case 20:
      return { simpleSeverity: simpleSeverities.MAJOR, description: severityLevels.SERVICE_CLOSED }
    default:
      return { simpleSeverity: simpleSeverities.NONE, description: severityLevels.NO_SEVERITY_GIVEN }
  }
}

const defaultDisruption = {
  affectedRoutes: [],
  affectedStops: [],
  description: '',
  category: '',
}

const transformDisruption = (disruption = defaultDisruption) => ({
  affectedRoutes: disruption.affectedRoutes,
  affectedStops: disruption.affectedStops,
  description: disruption.description,
  category: disruption.category,
})

const transformDisruptions = disruptions =>
  disruptions.map(d => d)

const transformLineStatuses = (lineStatuses) =>
  lineStatuses.map(lS => ({
    statusSeverity: severity(lS.statusSeverity),
    statusSeverityDescription: lS.statusSeverityDescription,
    disruption: transformDisruption(lS.disruption),
  }))

/**
 * transformApiResponse
 * Takes the raw array response from TfL Status API and transforms it
 * into something a little more understandable
 * https://api-portal.tfl.gov.uk/docs
 * @param {[{}]} data
 */
const transformApiResponse = data => data.map(line => ({
  id: line.id,
  disruptions: transformDisruptions(line.disruptions),
  statuses: transformLineStatuses(line.lineStatuses),
}))

const minorCSS = lineId => css`
  line[id*="lul-${lineId}"],
  path[id*="lul-${lineId}"] {
    stroke-dasharray: 5;
    animation: ${flash} 2s linear infinite;
  }
`

const majorCSS = lineId => css`
  line[id*="lul-${lineId}"],
  path[id*="lul-${lineId}"] {
    stroke-dasharray: 5;
    animation: ${flash} 2s linear infinite;
  }
`

const lineStatusesToCSS = (lineId, lineStatuses) => {
  const maxSeverity = lineStatuses.reduce((rtn, status) =>
    (status.statusSeverity.simpleSeverity > rtn ? status.statusSeverity.simpleSeverity : rtn),
    simpleSeverities.NONE
  )
  switch (maxSeverity) {
    case simpleSeverities.MINOR:
      return minorCSS(lineId);
    case simpleSeverities.MAJOR:
      return majorCSS(lineId);
    default:
      return ''
  }
}

const statusToCSS = status => status.map(line => lineStatusesToCSS(line.id, line.statuses))

const StylesFromStatus = createGlobalStyle`
  ${props => statusToCSS(props.status)}
`;

const onInit = (setStatus) => () => {
  async function loadStatus() {
    const { data } = await axios.get('https://api.tfl.gov.uk/line/mode/tube/status')
    const lineStatus = transformApiResponse(data)
    setStatus(lineStatus)
    console.log('API RESP:', data);
  }
  
  loadStatus();
}

export default () => {
  const [status, setStatus] = useState([])
  useEffect(onInit(setStatus), [])

  console.log('STATUS:', status)
  return (
    <Wrapper>
      <StylesFromStatus status={status} />
      <MapDay />
    </Wrapper>
  )
}
