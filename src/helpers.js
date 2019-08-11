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

export const simpleSeverities = {
  NONE: 0,
  MINOR: 1,
  MAJOR: 2,
}
  
export const severity = severityLevel => {
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

export const defaultDisruption = {
  affectedRoutes: [],
  affectedStops: [],
  description: '',
  category: '',
}