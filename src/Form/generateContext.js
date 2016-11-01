import Event from 'event.es6'

export default function generateContext(handleEmit) {
  const event = new Event(handleEmit)
  const data = {}
  return {
    event: event,
    data: data
  }
}


