import React, { useEffect, useState } from 'react';
import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
import axios from 'axios';
import MapDay from './MapDay';
import {
  simpleSeverities,
  severity,
  defaultDisruption,
} from './helpers'

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

const minorFlash = keyframes`
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 75;
  }
`;

const majorFlash = keyframes`
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 25;
  }
`;

const minorCSS = lineId => css`
  line[id*="lul-${lineId}"],
  path[id*="lul-${lineId}"] {
    stroke-dasharray: 5;
    animation: ${minorFlash} 2s linear infinite;
  }
`

const majorCSS = lineId => css`
  line[id*="lul-${lineId}"],
  path[id*="lul-${lineId}"] {
    stroke-dasharray: 5;
    animation: ${majorFlash} 2s linear infinite;
  }
`

/**
 * Simplifies a TfL Disruption object
 * @param {TfL Disruption} disruption 
 */
const transformDisruption = (disruption = defaultDisruption) => ({
  affectedRoutes: disruption.affectedRoutes,
  affectedStops: disruption.affectedStops,
  description: disruption.description,
  category: disruption.category,
})

/**
 * I was hopeful this would give a more detailed breakdown but
 * at the time of testing all arrays are empty. Currently unused.
 * @param {[TfL Line Disruptions]} lineStatuses 
 */
const transformDisruptions = disruptions =>
  disruptions.map(d => d)

/**
 * Map line statuses into more understandable objects with
 * simplified severity levels (None, Minor, Major)
 * @param {[TFL Line Statuses]} lineStatuses 
 */
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
 * @param {[TfL Line Response]} data
 */
const transformApiResponse = data => data.map(line => ({
  id: line.id,
  disruptions: transformDisruptions(line.disruptions),
  statuses: transformLineStatuses(line.lineStatuses),
}))

/**
 * 
 * @param {string} lineId The ID of the line 
 * @param {*} lineStatuses Array of statuses for one line produced by transformApiResponse
 */
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

/**
 * Transforms the output of transformApiResponse into CSS
 * @param {*} status 
 */
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
