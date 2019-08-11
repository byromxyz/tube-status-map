import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
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

  line[id*="lul-piccadilly"],
  path[id*="lul-piccadilly"] {
    stroke-dasharray: 5;
    animation: ${flash} 2s linear infinite;
  }
`;

// const Map = styled.img`
//   width: calc(100% - 100px);
//   height: calc(100% - 100px);
//   margin: 25px;
// `;

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

const transformLineStatuses = lineStatuses =>
  lineStatuses.map(lS => ({
    statusSeverity: lS.statusSeverity,
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
const transformApiResponse = data =>
  data.reduce((rtn, line) => {
    return {
      ...rtn,
      [line.id]: {
        disruptions: transformDisruptions(line.disruptions),
        statuses: transformLineStatuses(line.lineStatuses),
      }
    }
  }, {})


const onLoad = (setStatus) => () => {
  async function loadStatus() {
    const { data } = await axios.get('https://api.tfl.gov.uk/line/mode/tube/status')
    const lineStatus = transformApiResponse(data)
    setStatus(lineStatus)
    console.log('API RESP:', data);
  }  
  
  loadStatus();
}

export default () => {
  const [status, setStatus] = useState({})
  useEffect(onLoad(setStatus), [])

  console.log('STATUS:', status)
  return (
    <Wrapper>
      <MapDay />
    </Wrapper>
  )
}
