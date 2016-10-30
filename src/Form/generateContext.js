import Event from 'event.es6'

export default function generateContext() {
  const event = new Event()
  const data = {}

  return {
    event: event,
    data: data
  }
}
