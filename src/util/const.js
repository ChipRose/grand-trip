const getNoPointMessage = (filterType='everthing') => {
  const NO_POINT_MESSAGE = {
    'everthing': 'Click New Event to create your first point',
    'past': 'There are no past events now',
    'future': 'There are no future events now',
  }
  return NO_POINT_MESSAGE[filterType];
}

export { getNoPointMessage };
